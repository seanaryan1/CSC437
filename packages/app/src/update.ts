import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "comment/select":
      loadComment(message[1], user)
        .then((comment) => apply((model) => ({ ...model, comment })));
      break;

    default:
      throw new Error(`Unhandled message "${message[0]}"`);
  }
}

async function loadComment(
  payload: { commentId: string },
  user: Auth.User
) {
  const res = await fetch(`/api/comments/${payload.commentId}`, {
    headers: Auth.headers(user)
  });
  
  if (res.ok) {
    return await res.json();
  }
  return undefined;
}
