-- Hope4PKD operational MVP foundation
-- Review and apply to staging before production. Never run unreviewed migrations
-- against a project that already contains patient or financial records.

create extension if not exists pgcrypto;

do $$ begin create type public.staff_role as enum (
  'super_administrator', 'case_manager', 'medical_verifier', 'finance_officer',
  'programme_manager', 'communications_officer', 'read_only_auditor'
); exception when duplicate_object then null; end $$;

do $$ begin create type public.case_status as enum (
  'request_received', 'initial_review', 'onboarding_invited', 'onboarding_in_progress',
  'medical_verification', 'case_assessment', 'support_planning', 'support_in_progress',
  'follow_up', 'completed', 'declined', 'withdrawn', 'on_hold'
); exception when duplicate_object then null; end $$;

do $$ begin create type public.content_status as enum ('draft', 'review', 'published', 'archived');
exception when duplicate_object then null; end $$;
do $$ begin create type public.scan_status as enum ('quarantined', 'scanning', 'clean', 'rejected', 'error');
exception when duplicate_object then null; end $$;
do $$ begin create type public.donation_status as enum ('initialised', 'confirmed', 'failed', 'refunded', 'partially_refunded');
exception when duplicate_object then null; end $$;
do $$ begin create type public.identity_level as enum ('anonymous', 'first_name', 'full_name', 'full_profile');
exception when duplicate_object then null; end $$;

create sequence if not exists public.case_reference_sequence start 1;
create sequence if not exists public.enquiry_reference_sequence start 1;

create or replace function public.next_case_reference()
returns text language sql volatile set search_path = '' as $$
  select 'H4P-' || to_char(now() at time zone 'UTC', 'YYYY') || '-' || lpad(nextval('public.case_reference_sequence')::text, 5, '0');
$$;

create or replace function public.next_enquiry_reference()
returns text language sql volatile set search_path = '' as $$
  select 'ENQ-' || to_char(now() at time zone 'UTC', 'YYYY') || '-' || lpad(nextval('public.enquiry_reference_sequence')::text, 5, '0');
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete restrict,
  display_name text not null,
  role public.staff_role not null,
  active boolean not null default true,
  invited_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.consent_versions (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  version text not null,
  content_hash text not null,
  effective_at timestamptz,
  retired_at timestamptz,
  unique (kind, version)
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default public.next_case_reference(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  state text not null,
  relationship text not null check (relationship in ('self', 'caregiver', 'family', 'other')),
  diagnosis_status text not null check (diagnosis_status in ('confirmed', 'suspected', 'caregiver', 'unsure')),
  support_need text not null,
  summary text not null,
  contact_consent boolean not null,
  privacy_consent boolean not null,
  consent_version text not null,
  source text not null default 'website',
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  state text,
  date_of_birth date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.caregivers (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  auth_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text,
  phone text,
  relationship text,
  authorised boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  request_id uuid not null unique references public.support_requests(id) on delete restrict,
  patient_id uuid references public.patients(id) on delete restrict,
  patient_email text not null,
  status public.case_status not null default 'request_received',
  safe_next_step text not null default 'Hope4PKD is reviewing the request.',
  safe_contact_guidance text not null default 'Use the contact guidance in your acknowledgement email.',
  status_changed_at timestamptz not null default now(),
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  email text not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.case_status_history (
  id bigint generated always as identity primary key,
  case_id uuid not null references public.cases(id) on delete restrict,
  from_status public.case_status,
  to_status public.case_status not null,
  reason_code text,
  private_reason text,
  safe_next_step text not null,
  changed_by uuid not null references auth.users(id),
  changed_at timestamptz not null default now()
);

create table if not exists public.case_assignments (
  case_id uuid not null references public.cases(id) on delete cascade,
  staff_user_id uuid not null references public.staff_profiles(user_id) on delete restrict,
  assigned_by uuid not null references auth.users(id),
  assigned_at timestamptz not null default now(),
  ended_at timestamptz,
  primary key (case_id, staff_user_id, assigned_at)
);

create table if not exists public.internal_notes (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  author_id uuid not null references auth.users(id),
  body text not null,
  created_at timestamptz not null default now(),
  amended_at timestamptz
);

create table if not exists public.support_plans (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  version integer not null default 1,
  plan jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'draft',
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  unique (case_id, version)
);

create table if not exists public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  due_at timestamptz not null,
  completed_at timestamptz,
  outcome text,
  owner_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.cases(id) on delete restrict,
  patient_id uuid references public.patients(id) on delete restrict,
  version_id uuid not null references public.consent_versions(id),
  scope text not null,
  granted boolean not null,
  identity_level public.identity_level,
  captured_at timestamptz not null default now(),
  withdrawn_at timestamptz,
  evidence jsonb not null default '{}'::jsonb
);

create table if not exists public.medical_details (
  case_id uuid primary key references public.cases(id) on delete restrict,
  diagnosis_summary text,
  treatment_summary text,
  facility_summary text,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

create table if not exists public.provider_verifications (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  provider_name text not null,
  verification_status text not null check (verification_status in ('pending', 'verified', 'rejected')),
  verified_by uuid references auth.users(id),
  verified_at timestamptz,
  evidence text,
  created_at timestamptz not null default now()
);

create table if not exists public.cost_reviews (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  currency text not null default 'NGN',
  amount_minor bigint not null check (amount_minor >= 0),
  description text not null,
  status text not null check (status in ('pending', 'validated', 'rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.case_documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  storage_path text not null unique,
  original_filename text not null,
  safe_filename text not null,
  mime_type text not null check (mime_type in ('application/pdf', 'image/jpeg', 'image/png')),
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 10485760),
  checksum_sha256 text not null,
  scan_status public.scan_status not null default 'quarantined',
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.scan_results (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.case_documents(id) on delete restrict,
  scanner text not null,
  result public.scan_status not null,
  signature_verified boolean not null default false,
  scanned_at timestamptz not null default now(),
  details jsonb not null default '{}'::jsonb
);

create table if not exists public.document_access_logs (
  id bigint generated always as identity primary key,
  document_id uuid not null references public.case_documents(id) on delete restrict,
  staff_user_id uuid not null references auth.users(id),
  purpose text not null,
  action text not null check (action in ('preview', 'download')),
  accessed_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null unique references public.cases(id) on delete restrict,
  slug text not null unique,
  title text not null,
  summary text not null,
  public_name text,
  identity_level public.identity_level not null default 'anonymous',
  target_amount_minor bigint not null check (target_amount_minor > 0),
  currency text not null default 'NGN',
  status public.content_status not null default 'draft',
  verification_complete boolean not null default false,
  consent_current boolean not null default false,
  costs_validated boolean not null default false,
  programme_approved_by uuid references auth.users(id),
  finance_approved_by uuid references auth.users(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaign_cost_items (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete restrict,
  label text not null,
  amount_minor bigint not null check (amount_minor >= 0),
  sort_order integer not null default 0
);

create table if not exists public.campaign_updates (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete restrict,
  title text not null,
  body text not null,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'paystack',
  provider_reference text not null unique,
  donor_email text not null,
  donor_name text,
  campaign_id uuid references public.campaigns(id) on delete restrict,
  allocation_kind text not null check (allocation_kind in ('campaign', 'general_fund')),
  currency text not null default 'NGN',
  amount_minor bigint not null check (amount_minor > 0),
  fee_minor bigint check (fee_minor >= 0),
  status public.donation_status not null default 'initialised',
  confirmed_at timestamptz,
  provider_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  provider_subscription_code text not null unique,
  donor_email text not null,
  campaign_id uuid references public.campaigns(id) on delete restrict,
  amount_minor bigint not null,
  currency text not null default 'NGN',
  status text not null,
  manage_token_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.allocations (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete restrict,
  case_id uuid references public.cases(id) on delete restrict,
  fund text not null,
  amount_minor bigint not null check (amount_minor > 0),
  approved_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.disbursements (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  provider_verification_id uuid references public.provider_verifications(id) on delete restrict,
  amount_minor bigint not null check (amount_minor > 0),
  currency text not null default 'NGN',
  payee_reference text not null,
  status text not null,
  approved_by uuid not null references auth.users(id),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.refunds (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete restrict,
  provider_reference text not null unique,
  amount_minor bigint not null check (amount_minor > 0),
  reason text not null,
  approved_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.receipts (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null unique references public.donations(id) on delete restrict,
  receipt_number text not null unique,
  issued_at timestamptz not null default now(),
  storage_path text
);

create table if not exists public.reviewers (
  user_id uuid primary key references public.staff_profiles(user_id) on delete restrict,
  qualification text not null,
  professional_body text,
  registration_reference text,
  approved boolean not null default false,
  approved_by uuid references auth.users(id),
  approved_at timestamptz
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  body text not null,
  category text not null,
  status public.content_status not null default 'draft',
  author_id uuid not null references auth.users(id),
  reviewer_id uuid references public.reviewers(user_id),
  reviewed_at timestamptz,
  references_json jsonb not null default '[]'::jsonb,
  disclaimer text,
  next_review_at date,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  content_id uuid not null,
  revision integer not null,
  snapshot jsonb not null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  unique (content_type, content_id, revision)
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(), name text not null, role text not null, biography text,
  image_path text, linkedin_url text, status public.content_status not null default 'draft', sort_order integer not null default 0
);
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(), name text not null, description text, logo_path text, url text,
  permission_confirmed boolean not null default false, status public.content_status not null default 'draft'
);
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(), slug text not null unique, title text not null, summary text not null,
  starts_at timestamptz not null, ends_at timestamptz, location text, price_minor bigint, owner_id uuid references auth.users(id),
  status public.content_status not null default 'draft', published_at timestamptz
);
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(), slug text not null unique, title text not null, reporting_period text not null,
  methodology text not null, file_path text, status public.content_status not null default 'draft', approved_by uuid references auth.users(id), published_at timestamptz
);
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(), question text not null, answer text not null, category text,
  status public.content_status not null default 'draft', sort_order integer not null default 0
);
create table if not exists public.policies (
  id uuid primary key default gen_random_uuid(), slug text not null unique, title text not null, body text not null,
  version text not null, owner_id uuid references auth.users(id), legal_approved_by uuid references auth.users(id),
  approved_at timestamptz, effective_at timestamptz, status public.content_status not null default 'draft'
);
create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(), key text not null, label text not null, value_numeric numeric,
  value_text text, metric_kind text not null check (metric_kind in ('result', 'target')), reporting_period text not null,
  source text not null, verified_by uuid references auth.users(id), status public.content_status not null default 'draft', unique (key, reporting_period, metric_kind)
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default public.next_enquiry_reference(),
  name text not null, email text not null, organisation text,
  category text not null check (category in ('general', 'partnership', 'volunteer', 'complaint', 'privacy')),
  message text not null, privacy_consent boolean not null, consent_version text not null,
  assigned_to uuid references auth.users(id), resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_applications (
  id uuid primary key default gen_random_uuid(), enquiry_id uuid not null unique references public.enquiries(id) on delete restrict,
  organisation_type text, due_diligence_status text not null default 'pending', owner_id uuid references auth.users(id)
);
create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(), enquiry_id uuid not null unique references public.enquiries(id) on delete restrict,
  skills text[], screening_status text not null default 'pending', owner_id uuid references auth.users(id)
);

create table if not exists public.case_status_challenges (
  id uuid primary key,
  case_id uuid not null references public.cases(id) on delete cascade,
  email text not null,
  code_hash text not null,
  attempts integer not null default 0,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.rate_limit_buckets (
  fingerprint text not null,
  scope text not null,
  window_started_at timestamptz not null,
  request_count integer not null default 1,
  primary key (fingerprint, scope)
);

create table if not exists public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id),
  event_type text not null,
  entity_type text not null,
  entity_id text not null,
  reason text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.email_outbox (
  id uuid primary key default gen_random_uuid(),
  deduplication_key text not null unique,
  kind text not null,
  record_id uuid not null,
  recipient text not null,
  status text not null check (status in ('pending', 'sending', 'sent', 'failed')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.feature_flags (
  key text primary key, enabled boolean not null default false, required_approvals text[] not null default '{}',
  changed_by uuid references auth.users(id), changed_at timestamptz not null default now()
);
create table if not exists public.routing_settings (
  key text primary key, value jsonb not null, approved_by uuid references auth.users(id), updated_at timestamptz not null default now()
);
create table if not exists public.analytics_events (
  id bigint generated always as identity primary key, event_name text not null, anonymous_session_hash text,
  properties jsonb not null default '{}'::jsonb, occurred_at timestamptz not null default now(),
  constraint analytics_no_sensitive_keys check (not (properties ?| array['email','phone','name','reference','medical','message']))
);

create or replace function public.consume_rate_limit(
  p_fingerprint text, p_scope text, p_limit integer, p_window_minutes integer
) returns boolean language plpgsql security definer set search_path = '' as $$
declare current_row public.rate_limit_buckets%rowtype;
begin
  insert into public.rate_limit_buckets (fingerprint, scope, window_started_at, request_count)
  values (p_fingerprint, p_scope, now(), 1)
  on conflict (fingerprint, scope) do update set
    window_started_at = case when public.rate_limit_buckets.window_started_at < now() - make_interval(mins => p_window_minutes) then now() else public.rate_limit_buckets.window_started_at end,
    request_count = case when public.rate_limit_buckets.window_started_at < now() - make_interval(mins => p_window_minutes) then 1 else public.rate_limit_buckets.request_count + 1 end
  returning * into current_row;
  return current_row.request_count <= p_limit;
end;
$$;
revoke all on function public.consume_rate_limit(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_rate_limit(text, text, integer, integer) to service_role;

create or replace function public.block_audit_mutation()
returns trigger language plpgsql set search_path = '' as $$
begin raise exception 'audit events are append-only'; end;
$$;
drop trigger if exists audit_events_immutable on public.audit_events;
create trigger audit_events_immutable before update or delete on public.audit_events for each row execute function public.block_audit_mutation();

create or replace function public.enforce_article_publication()
returns trigger language plpgsql set search_path = '' as $$
declare reviewer_approved boolean; reviewer_user uuid;
begin
  if new.status = 'published' then
    select approved, user_id into reviewer_approved, reviewer_user from public.reviewers where user_id = new.reviewer_id;
    if new.reviewer_id is null or reviewer_approved is not true or reviewer_user = new.author_id
      or new.reviewed_at is null or jsonb_array_length(new.references_json) = 0
      or new.disclaimer is null or new.next_review_at is null then
      raise exception 'medical publication gate is incomplete';
    end if;
    new.published_at = coalesce(new.published_at, now());
  end if;
  return new;
end;
$$;
drop trigger if exists articles_publication_gate on public.articles;
create trigger articles_publication_gate before insert or update on public.articles for each row execute function public.enforce_article_publication();

create or replace function public.enforce_campaign_publication()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.status = 'published' and (
    new.verification_complete is not true or new.consent_current is not true or new.costs_validated is not true
    or new.programme_approved_by is null or new.finance_approved_by is null
  ) then raise exception 'campaign publication gate is incomplete'; end if;
  if new.status = 'published' then new.published_at = coalesce(new.published_at, now()); end if;
  return new;
end;
$$;
drop trigger if exists campaigns_publication_gate on public.campaigns;
create trigger campaigns_publication_gate before insert or update on public.campaigns for each row execute function public.enforce_campaign_publication();

create or replace view public.public_case_status as
select
  c.id as case_id,
  case c.status
    when 'request_received' then 'Request received'
    when 'initial_review' then 'Initial review'
    when 'onboarding_invited' then 'Onboarding invitation sent'
    when 'onboarding_in_progress' then 'Onboarding in progress'
    when 'medical_verification' then 'Medical verification'
    when 'case_assessment' then 'Case assessment'
    when 'support_planning' then 'Support planning'
    when 'support_in_progress' then 'Support in progress'
    when 'follow_up' then 'Follow-up'
    when 'completed' then 'Completed'
    when 'declined' then 'Review complete'
    when 'withdrawn' then 'Case closed'
    when 'on_hold' then 'Assessment in progress'
  end as label,
  to_char(c.status_changed_at at time zone 'UTC', 'YYYY-MM-DD') as status_date,
  c.safe_next_step as next_step,
  c.safe_contact_guidance as contact_guidance
from public.cases c;

create or replace view public.public_campaigns as
select c.id, c.slug, c.title, c.summary, c.public_name, c.identity_level, c.target_amount_minor,
  c.currency, c.published_at,
  coalesce((select sum(a.amount_minor) from public.allocations a where a.case_id = c.case_id), 0) as allocated_amount_minor
from public.campaigns c where c.status = 'published' and c.verification_complete and c.consent_current and c.costs_validated;

create or replace view public.public_articles as
select a.id, a.slug, a.title, a.summary, a.body, a.category, a.published_at, a.reviewed_at,
  a.next_review_at, a.references_json, a.disclaimer, r.qualification as reviewer_qualification,
  sp.display_name as reviewer_name
from public.articles a join public.reviewers r on r.user_id = a.reviewer_id
join public.staff_profiles sp on sp.user_id = r.user_id
where a.status = 'published' and r.approved;

create or replace function public.auth_staff_role()
returns public.staff_role language sql stable security definer set search_path = '' as $$
  select role from public.staff_profiles where user_id = auth.uid() and active;
$$;
create or replace function public.auth_aal2()
returns boolean language sql stable set search_path = '' as $$
  select coalesce((auth.jwt() ->> 'aal') = 'aal2', false);
$$;

-- RLS is enabled on all sensitive tables. Service-role code is the only public
-- form writer. Staff access requires an invited active profile and AAL2.
do $$
declare table_name text;
begin
  foreach table_name in array array[
    'staff_profiles','consent_versions','support_requests','patients','caregivers','cases','invitations',
    'case_status_history','case_assignments','internal_notes','support_plans','follow_ups','consents',
    'medical_details','provider_verifications','cost_reviews','case_documents','scan_results','document_access_logs',
    'campaigns','campaign_cost_items','campaign_updates','donations','subscriptions','allocations','disbursements',
    'refunds','receipts','reviewers','articles','content_revisions','team_members','partners','events','reports','faqs',
    'policies','impact_metrics','enquiries','partnership_applications','volunteer_applications','case_status_challenges',
    'rate_limit_buckets','audit_events','email_outbox','feature_flags','routing_settings','analytics_events'
  ] loop execute format('alter table public.%I enable row level security', table_name); end loop;
end $$;

create policy "staff can read own profile with aal2" on public.staff_profiles for select to authenticated
using (public.auth_aal2() and (user_id = auth.uid() or public.auth_staff_role() = 'super_administrator'));

create policy "authorised staff can read cases" on public.cases for select to authenticated using (
  public.auth_aal2() and (
    public.auth_staff_role() in ('super_administrator','programme_manager','medical_verifier','read_only_auditor')
    or exists (select 1 from public.case_assignments a where a.case_id = cases.id and a.staff_user_id = auth.uid() and a.ended_at is null)
  )
);
create policy "case workers can update cases" on public.cases for update to authenticated using (
  public.auth_aal2() and (
    public.auth_staff_role() in ('super_administrator','programme_manager')
    or exists (select 1 from public.case_assignments a where a.case_id = cases.id and a.staff_user_id = auth.uid() and a.ended_at is null)
  )
);

create policy "medical roles can read medical details" on public.medical_details for select to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','medical_verifier','read_only_auditor'));
create policy "medical roles can change medical details" on public.medical_details for all to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','medical_verifier'))
with check (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','medical_verifier'));
create policy "medical roles can read provider verification" on public.provider_verifications for select to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','medical_verifier','finance_officer','programme_manager','read_only_auditor'));
create policy "medical roles can change provider verification" on public.provider_verifications for all to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','medical_verifier'))
with check (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','medical_verifier'));

create policy "clean documents only for medical roles" on public.case_documents for select to authenticated
using (public.auth_aal2() and scan_status = 'clean' and public.auth_staff_role() in ('super_administrator','medical_verifier'));
create policy "document access logs for auditors" on public.document_access_logs for select to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','medical_verifier','read_only_auditor'));
create policy "medical roles log document access" on public.document_access_logs for insert to authenticated
with check (public.auth_aal2() and staff_user_id = auth.uid() and public.auth_staff_role() in ('super_administrator','medical_verifier'));

create policy "finance roles can read donations" on public.donations for select to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','finance_officer','programme_manager','read_only_auditor'));
create policy "finance roles can read allocations" on public.allocations for select to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','finance_officer','programme_manager','read_only_auditor'));
create policy "finance roles can read disbursements" on public.disbursements for select to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','finance_officer','programme_manager','read_only_auditor'));
create policy "finance roles can change finance records" on public.disbursements for all to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','finance_officer'))
with check (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','finance_officer'));

create policy "content roles can manage articles" on public.articles for all to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','communications_officer','programme_manager','medical_verifier'))
with check (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','communications_officer','programme_manager','medical_verifier'));
create policy "content roles can manage campaigns" on public.campaigns for all to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','communications_officer','programme_manager','finance_officer'))
with check (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','communications_officer','programme_manager','finance_officer'));

create policy "auditors can read audit events" on public.audit_events for select to authenticated
using (public.auth_aal2() and public.auth_staff_role() in ('super_administrator','read_only_auditor'));

grant select on public.public_campaigns, public.public_articles to anon, authenticated;
revoke all on public.public_case_status from anon, authenticated;
grant select on public.public_case_status to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('case-document-quarantine', 'case-document-quarantine', false, 10485760, array['application/pdf','image/jpeg','image/png'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- No direct storage.objects policy is created for patients or staff here.
-- Release 2 must add invitation-bound resumable upload and five-minute clean-file
-- preview policies only after scanner, DPIA, retention, backups and MFA are live.

create index if not exists support_requests_created_at_idx on public.support_requests(created_at desc);
create index if not exists cases_status_idx on public.cases(status, status_changed_at desc);
create index if not exists case_assignments_active_idx on public.case_assignments(staff_user_id, case_id) where ended_at is null;
create index if not exists case_documents_case_idx on public.case_documents(case_id, scan_status);
create index if not exists donations_campaign_idx on public.donations(campaign_id, status);
create index if not exists email_outbox_pending_idx on public.email_outbox(status, next_attempt_at) where status in ('pending','failed');
create index if not exists audit_events_entity_idx on public.audit_events(entity_type, entity_id, occurred_at desc);
create index if not exists case_status_challenges_expiry_idx on public.case_status_challenges(expires_at) where consumed_at is null;

drop trigger if exists support_requests_updated_at on public.support_requests;
create trigger support_requests_updated_at before update on public.support_requests for each row execute function public.set_updated_at();
drop trigger if exists cases_updated_at on public.cases;
create trigger cases_updated_at before update on public.cases for each row execute function public.set_updated_at();
drop trigger if exists campaigns_updated_at on public.campaigns;
create trigger campaigns_updated_at before update on public.campaigns for each row execute function public.set_updated_at();
drop trigger if exists donations_updated_at on public.donations;
create trigger donations_updated_at before update on public.donations for each row execute function public.set_updated_at();

insert into public.feature_flags (key, enabled, required_approvals) values
  ('support_intake', false, array['programme','privacy','operations']),
  ('document_uploads', false, array['scanner','dpia','retention','backups','mfa']),
  ('campaigns', false, array['programme','finance','consent']),
  ('donations', false, array['paystack_live','finance','refunds','surplus'])
on conflict (key) do nothing;
