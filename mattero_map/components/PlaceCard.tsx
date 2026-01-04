"use client";

import { Card, Text, Group, Stack, Badge } from "@mantine/core";
import { place } from "../domain/place";
import { StarRating } from "./StarRating";

type Props = {
  place: place;
  onClick?: () => void;
};

export function PlaceCard({ place, onClick }: Props) {
  return (
    <Card
      withBorder
      radius="md"
      padding="md"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Stack gap="xs">
        <Text fw={600} lineClamp={2}>
          {place.name}
        </Text>

        {place.categoryName && (
          <Badge variant="light">★ {place.categoryName}</Badge>
        )}
        {place.value && <StarRating rating={place.value} showValue />}

        {place.visitedAt && (
          <Text size="sm" c="dimmed">
            {place.visitedAt}
          </Text>
        )}

        {place.memo && (
          <Text size="sm" lineClamp={2}>
            {place.memo}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
