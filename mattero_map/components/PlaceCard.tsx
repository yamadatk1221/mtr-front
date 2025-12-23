"use client";

import { Card, Text, Group, Stack, Badge } from "@mantine/core";
import type { place } from "../domain/place";

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
        <Group justify="space-between" align="start" wrap="nowrap">
          <Text fw={600} lineClamp={2}>
            {place.name}
          </Text>

          {place.latitude && <Badge variant="light">★ {place.longitude}</Badge>}
        </Group>

        {place.visitedAt && (
          <Text size="sm" c="dimmed">
            {place.visitedAt}
          </Text>
        )}

        {place.categoryName && (
          <Text size="sm" lineClamp={2}>
            {place.categoryName}
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
