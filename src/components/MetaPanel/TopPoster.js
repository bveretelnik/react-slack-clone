import React from "react";
import { Image, List } from "semantic-ui-react";

export default function TopPoster({ userPosts }) {
  const formatCount = (num) =>
    num > 1 || num === 0 ? `${num} posts` : `${num} post`;
  const displayTopPosters = (post) => {
    return Object.entries(post)
      .sort((a, b) => b[1] - a[1])
      .map(([key, val], i) => (
        <List.Item key={i}>
          <Image avatar src={val.avatar} />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description>{formatCount(val.count)}</List.Description>
          </List.Content>
        </List.Item>
      ))
      .slice(0, 5);
  };

  return <List>{userPosts && displayTopPosters(userPosts)}</List>;
}
