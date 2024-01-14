export type VCComment = string | {
  content: string,
  [key: string]: any
} 

export type VCCommentRating = {
  comment: VCComment, 
  rating: number
}

export type VCApiResult = [VCCommentRating];

export type VCCommentLang = "English" // | "Spanish" | "Portuguese";