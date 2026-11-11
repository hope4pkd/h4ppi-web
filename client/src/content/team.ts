import ifunanyaPhoto from "@public/assets/images/ifunanya.png";
import israelPhoto from "@public/assets/images/israel.png";
import maureenPhoto from "@public/assets/images/maureen.png";
import onyekachiPhoto from "@public/assets/images/onyekachi.png";
import type { StaticImageData } from "next/image";

/**
 * The people named in "Who runs Hope4PKD" on /about.
 *
 * Every record is supplied by the owner. Names, roles and photographs here are the owner's roster of
 * 2026-07-18, restored on 2026-11-11 — see DECISIONS.log. Do not infer a person, a title, a
 * qualification or a biography: leave the field out and the page leaves it out.
 *
 * - `photo` is optional. A member without one renders a monogram, never a stock image.
 * - `bio` is optional and stays absent until the person has approved the wording.
 * - `advisors` is empty until an advisor is confirmed; /about shows an EmptyState for an empty list.
 */
export type TeamMember = {
  name: string;
  role: string;
  photo?: {
    src: StaticImageData;
    /** Where the 4:5 crop sits when the source is a different shape. */
    objectPosition?: string;
  };
  bio?: string;
};

export const leadership: readonly TeamMember[] = [
  {
    name: "Onyekachi Nwakaihe",
    role: "Founder / Executive Director",
    photo: { src: onyekachiPhoto },
  },
  {
    name: "Maureen Alor",
    role: "Patient Support and Programs",
    photo: { src: maureenPhoto },
  },
  {
    name: "Ifunanya Nwakaihe",
    role: "Partnerships and Fundraising",
    photo: { src: ifunanyaPhoto, objectPosition: "50% 30%" },
  },
  {
    name: "Israel Oyebamiji",
    role: "Communications and Events",
    photo: { src: israelPhoto },
  },
];

export const advisors: readonly TeamMember[] = [];
