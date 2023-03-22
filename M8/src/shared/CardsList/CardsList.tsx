import styles from "./cardslist.css";
import { Card } from "./Card";
import { GenericList, IGenericListItem } from "../components/UI/GenericList";
import { mergeLeft, pipe } from "ramda";
import { useContext } from "react";
import { postsDataContext } from "../../context/postsDataContext";

export function CardsList() {
  const postsData = useContext(postsDataContext);

  const postsList: IGenericListItem[] = postsData.map(
    pipe((post) => {
      const {
        id,
        created,
        ups,
        url,
        author,
        sr_detail: { icon_img },
        thumbnail,
        num_comments,
        title,
      } = post.data;

      return {
        id,
        children: (
          <Card
            postId={id}
            previewSrc={
              /^.+\/[\w-]+\.[A-Za-z]{3,4}$/.test(thumbnail)
                ? thumbnail
                : undefined
            }
            title={title}
            authorUsername={author}
            authorAvatarSrc={icon_img}
            createdAtUTC={created}
            commentsCount={num_comments}
            upVotesCount={ups}
            postUrl={url}
          />
        ),
      };
    }, mergeLeft({ As: "li" as const }))
  );
  return (
    <ul className={styles.cardsList}>
      {postsData.length > 0 && <GenericList list={postsList} />}
    </ul>
  );
}
