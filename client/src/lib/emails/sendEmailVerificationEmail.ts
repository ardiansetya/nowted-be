import { sendEmail } from "./sendEmail";

export const sendEmailVerificationEmail = async ({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
}) => {
  return sendEmail({
    to: user.email,
    subject: "Verify your email",
    html: `
          <h1>Verify your email</h1>
          <p>Click <a href="${url}">here</a> to verify your email.</p>
        `,
    text: `Click ${url} to verify your email.`,
  });
};
