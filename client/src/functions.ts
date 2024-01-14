import { API_URL } from "./data";
import { VCApiResult, VCComment, VCCommentLang, VCCommentRating } from "./types";

async function apiFetch(comments: VCComment[], lang: VCCommentLang) {
  const result = await fetch(API_URL + "/rate" + ( lang ? "?lang=" + lang : "" ), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comments)
  });
  
  return await result.json() as VCApiResult;
}

export async function rate(comment: VCComment, scale: number = 10, lang: VCCommentLang = "English") {
  const commentRating = (await apiFetch([comment], lang))[0];
  return ratingScale([commentRating], scale)[0];
}

export async function bulkRate(comments: VCComment[], scale: number = 10, lang: VCCommentLang = "English") {
  const commentRatings = await apiFetch(comments, lang);
  return ratingScale(commentRatings, scale);
}

export function ratingScale(comments: VCCommentRating[], scale: number = 10) {
  if(scale == 10) return comments;
  const scaleFactor = scale / 10;
  return comments.map(comment => {
    comment.rating *= scaleFactor
    return comment
  });
}