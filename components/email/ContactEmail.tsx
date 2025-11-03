import * as React from "react";

type Props = {
  name: string;
  phone: string;
  email: string;
  zip?: string;
  serviceType?: string | null;
  date?: string | null;
  timeWindow?: string | null;
  budget?: string | null;
  details?: string | null;
};

export function ContactEmail(props: Props) {
  const Row = ({ label, value }: { label: string; value?: string | null }) =>
    value ? (
      <p>
        <strong>{label}:</strong> {value}
      </p>
    ) : null;

  return (
    <div style={{
      fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif",
      lineHeight: 1.6,
    }}>
      <h2 style={{ margin: "0 0 12px" }}>New Contact Request</h2>
      <Row label="Name" value={props.name} />
      <Row label="Phone" value={props.phone} />
      <Row label="Email" value={props.email} />
      <Row label="ZIP" value={props.zip || undefined} />
      <Row label="Service type" value={props.serviceType || undefined} />
      <Row label="Preferred date" value={props.date || undefined} />
      <Row label="Time window" value={props.timeWindow || undefined} />
      <Row label="Approx. budget" value={props.budget || undefined} />
      {props.details ? (
        <p>
          <strong>Details:</strong>
          <br />
          {props.details}
        </p>
      ) : null}
    </div>
  );
}


