"use client";
import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Flex,
  List,
  Paper,
  Rating,
  TagsInput,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { FC } from "react";
import { IconUsers, IconMapPin } from "@tabler/icons-react";

const LeftContent: FC = () => {
  const items = [
    { title: "全国", href: "#" },
    { title: "神奈川", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Flex flex="1" direction="column" gap="md">
      <Paper withBorder radius="sm" p="sm">
        <Text mb="md" size="sm">
          キーワードから探す
        </Text>
        <form>
          <TagsInput
            placeholder="キーワードを入力"
            data={["J1", "サッカー専用", "駅近"]}
            variant="light"
            color="blue.4"
          />
        </form>
      </Paper>
      <Paper withBorder radius="sm" p="sm">
        <Text mb="md" size="sm">
          エリアから探す
        </Text>
        <Breadcrumbs mb="md" separator=">">
          {items}
        </Breadcrumbs>
        <Badge variant="light" p="xs" color="blue.3">
          Uvance 等々力
        </Badge>
        <Badge variant="light" p="xs" color="blue.3">
          日産
        </Badge>
        <Badge variant="light" p="xs" color="blue.3">
          三ツ沢
        </Badge>
        <Badge variant="light" p="xs" color="blue.3">
          レモンガス
        </Badge>
      </Paper>
    </Flex>
  );
};

export default function Home() {
  return (
    <Box className="main" p="lg">
      <Flex gap="md">
        <LeftContent />
        <Flex flex="3">
          <List spacing="sm" w="100%">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </List>
        </Flex>
      </Flex>
    </Box>
  );
}

const Item = () => {
  return (
    <List.Item
      styles={{
        itemWrapper: { width: "100%" },
        itemLabel: { width: "100%" },
      }}
    >
      <Paper withBorder radius="sm" p="sm">
        <Flex flex={1} gap="md">
          <Image
            width={240}
            height={160}
            src="/studium-photos/predo.jpg"
            alt=""
          ></Image>
          <Flex flex={1} justify="left" direction="column">
            <Flex>
              <Title c="gray.9" order={3}>
                大和ハウスプレミストドーム
              </Title>
              <Flex align="center" gap={4} ml="auto">
                <IconUsers color="gray" size={18} />
                <Text c="gray.8">38,000人</Text>
              </Flex>
            </Flex>
            <dl>
              <dt>ホームチーム:</dt>
              <dd>北海道コンサドーレ札幌</dd>
            </dl>
            <Flex mt="xs" mb="4" gap="xs">
              <Badge variant="light" p="xs" color="blue.3">
                屋内
              </Badge>
              <Badge variant="light" p="xs" color="blue.3">
                駅近
              </Badge>
            </Flex>
            <Flex align="center" gap={4}>
              <IconMapPin color="gray" size={18} />
              <Text c="gray.8">地下鉄福住駅から徒歩10分</Text>
            </Flex>
            <Flex my={4} gap="sm" align="center">
              <Rating defaultValue={4} />
              <Text c="gray.8">4.0</Text>
            </Flex>

            <Text fz="sm" c="gray.7">
              日本唯一の屋内サッカー施設
            </Text>
          </Flex>
        </Flex>
      </Paper>
    </List.Item>
  );
};
