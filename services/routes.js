import { getRoot } from "./config";

export const path = (name, argument, argument2) => {
  const root = getRoot().API_URL;
  switch (name) {
    case "register":
      return `${root}/api/auth/local/register`;
    case "all_posts":
      return `${root}/api/posts`;
    case "current_user":
      return `${root}/api/users/me?populate=posts`;
    case "HP_single_type":
      return `${root}/api/page?populate=hero_content, meta_title`;
    case "BLOG_single_type":
      return `${root}/api/page?populate=hero_content, meta_title`;
    case "POST_posts":
      return `${root}/api/posts`;
    case "UPDATE_posts":
      return `${root}/api/posts/${argument}`;
    case "DELETE_posts":
      return `${root}/api/posts/${argument}`;
  }
};
