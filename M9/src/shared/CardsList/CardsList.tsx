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
        author,
        preview,
        num_comments,
        title,
        selftext,
      } = post.data;

      return {
        id,
        className: styles.cardItem,
        children: (
          <Card
            postId={id}
            previewSrc={
              preview &&
              preview.images[0].source.url
                .replace("amp;s", "s")
                .replace("amp;", "")
                .replace("amp;", "")
            }
            title={title}
            authorUsername={author}
            createdAtUTC={created}
            commentsCount={num_comments}
            upVotesCount={ups}
            content={selftext}
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
