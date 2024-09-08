import x from '../assets/maresult.json';
import {Service} from "../types.ts";
import {Group, ScrollArea, Stack, Image, Text, Box} from "@mantine/core";

import result1 from '../assets/result_1.png';
import result2 from '../assets/result_2.png';
import result3 from '../assets/result_3.png';
import result4 from '../assets/result_4.png';
import result5 from '../assets/result_5.png';

export default function MaResult() {
  const data: Service[] = x;
  return <div style={{padding: "20px"}}>
    <ScrollArea>
      <Stack>
        {
          data.map((item, index) => {
            return <>
              <Group key={item.title} gap={10} onClick={() => window.location.href = item.applicationProcessAndLinks}>
                <Image
                  radius="md"
                  fit="contain"
                  w="20%"
                  src={index === 0 ? result1 : index === 2 ? result2 : index === 3 ? result3 : index === 4 ? result4 : result5}
                />
                <Text w="75%">{item.title}</Text>
              </Group>
              <Box bg="taipeiGray" w="100%" h={1}></Box>
            </>
          })
        }
      </Stack>
    </ScrollArea>
  </div>
}
