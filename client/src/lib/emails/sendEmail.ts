import { ServerClient } from "postmark";

const postMarkClient = new ServerClient(
  import.meta.env.VITE_POSTMARK_SERVER_TOKEN!
);

export function sendEmail({
  subject,
  html,
  text,
  to,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  return postMarkClient.sendEmail({
    From: import.meta.env.VITE_POSTMARK_FROM_EMAIL!,
    To: to,
    Subject: subject,
    HtmlBody: html,
    TextBody: text,
  });
}
