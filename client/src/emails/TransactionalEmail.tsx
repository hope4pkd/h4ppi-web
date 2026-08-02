export type TransactionalEmailProps = {
  preview: string;
  heading: string;
  body: string;
  reference?: string;
  actionLabel?: string;
  actionUrl?: string;
};

export function TransactionalEmail({ preview, heading, body, reference, actionLabel, actionUrl }: TransactionalEmailProps) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#FCFAF7", color: "#0B1F33", fontFamily: "Arial, sans-serif", margin: 0, padding: "32px 12px" }}>
        <div style={{ display: "none", maxHeight: 0, maxWidth: 0, opacity: 0, overflow: "hidden" }}>{preview}</div>
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #D7E2EA", borderRadius: "16px", margin: "0 auto", maxWidth: "580px", padding: "32px" }}>
          <p style={{ color: "#007A78", fontSize: "13px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase" }}>Hope4PKD Patients Initiative</p>
          <h1 style={{ color: "#0B1F33", fontSize: "30px", lineHeight: 1.15 }}>{heading}</h1>
          <p style={{ color: "#344F65", fontSize: "16px", lineHeight: 1.7 }}>{body}</p>
          {reference && <div style={{ backgroundColor: "#E6F8F7", borderRadius: "10px", margin: "24px 0", padding: "16px" }}><p style={{ color: "#0B1F33", fontSize: "14px", margin: 0 }}>Reference</p><p style={{ color: "#0B1F33", fontSize: "22px", fontWeight: 700, letterSpacing: "0.5px", margin: "6px 0 0" }}>{reference}</p></div>}
          {actionLabel && actionUrl && <a href={actionUrl} style={{ backgroundColor: "#007A78", borderRadius: "999px", color: "#FFFFFF", display: "inline-block", fontWeight: 700, padding: "13px 20px", textDecoration: "none" }}>{actionLabel}</a>}
          <p style={{ borderTop: "1px solid #D7E2EA", color: "#567186", fontSize: "13px", lineHeight: 1.6, marginTop: "28px", paddingTop: "18px" }}>This message contains no medical details. If you did not submit this request, contact Hope4PKD through the website.</p>
        </div>
      </body>
    </html>
  );
}
