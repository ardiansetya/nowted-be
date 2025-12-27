import { sendEmail } from "./sendEmail";

export const sendPasswordResetEmail = async ({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
}) => {
    return sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `
          <h1>Reset your password</h1>
          <p>Click <a href="${url}">here</a> to reset your password.</p>
        `,
        text: `Click ${url} to reset your password.`,
    })
};
