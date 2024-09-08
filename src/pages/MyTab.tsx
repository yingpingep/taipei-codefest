import {Box, Flex, Group, Input, ScrollArea, Stack, Text, Image} from '@mantine/core';
import './MyTab.css';
import {IconSearch} from '@tabler/icons-react';
import primary_icon_expand from '../assets/primary_icon_expand.svg';
import f1 from '../assets/5.jpg';
import f2 from '../assets/6.jpg';
import f3 from '../assets/7.jpg';
import f4 from '../assets/8.jpg';

const MyBenefit = () => {
  const items = Array.from({ length: 10 }, (_, k) => k + 1);
  return <Stack>
    <Group justify="space-between">
      <Text size="20px">我的福利</Text>
      <Group gap={0}>
        <Text size="14px" c="taipeiGray">更多</Text>
        <img src={primary_icon_expand} style={{color:"var(--mantine-color-taipeiGray-0)"}} alt="Vite logo" />
      </Group>
    </Group>

    <ScrollArea
      w="100%"
      h="130px"
      type="never"
    >
      <Box style={{ display: 'inline-block', width: 'max-content' }}>
        {items.map((item, index) => (
          <Box
            key={index}
            style={{
              display: 'inline-block',
              width: 150,
              marginRight: 15,
              textAlign: 'center',
            }}
          >
            <Stack gap={2}>
              <Box bg="taipeiMain.1" h={100} style={{
                borderRadius: '8px'
              }}></Box>
              <Box h={20}>
                {item}
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>
    </ScrollArea>
  </Stack>;
}

const MySubsidy = () => {
  const items = [
    {
      title: "第一個可用的福利",
      imgSrc:f1,
      url: "https://welfare.ntpc.gov.tw/viewService/show/1008086?fromOpa=1"
    },
    {
      title: "第一個可用的補助",
      imgSrc:f2,
      url: "https://eso.gov.taipei/News_Content.aspx?n=DF02DE8E0A136367&s=99D9DD12AC10698D"
    },
    {
      title: "第二個可用的福利",
      imgSrc:f3,
      url: ""
    },
    {
      title: "第三個可用的福利",
      imgSrc:f4,
      url: ""
    },
  ];
  return <Stack>
    <Group justify="space-between">
      <Text size="20px">我的福利與補助</Text>
      <Group gap={0}>
        <Text size="14px" c="taipeiGray">更多</Text>
        <img src={primary_icon_expand} style={{color:"var(--mantine-color-taipeiGray-0)"}} alt="Vite logo" />
      </Group>
    </Group>

    <ScrollArea
      w="100%"
      h="130px"
      type="never"
    >
      <Box style={{ display: 'inline-block', width: 'max-content' }}>
        {items.map((item, index) => (
          <Box
            key={index}
            style={{
              display: 'inline-block',
              width: 150,
              marginRight: 15,
              textAlign: 'center',
            }}
            onClick={() => {
              if (item.url) {
                window.location.href = item.url;
              }
            }}
          >
            <Stack gap={2}>
              <Image src={item.imgSrc} h={100} style={{
                borderRadius: '8px'
              }}></Image>
              <Box h={20}>
                {item.title}
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>
    </ScrollArea>
  </Stack>;
}

export default function MyTab() {
  return (
    <div className="my-tab">
      <Stack>
        <Group gap={0}>

          <Input
            style={{flexGrow: 1}}
            placeholder="搜尋福利或補助"
          />
          <Flex h="36px" w="36px" justify="center" align="center" bg="taipeiMain" pos="absolute" right="20px" style={{
            borderRadius: '4px'
          }}>
            <IconSearch color="white"/>
          </Flex>
        </Group>

        {/*<MyBenefit />*/}
        <MySubsidy/>
      </Stack>
    </div>
  );
}
