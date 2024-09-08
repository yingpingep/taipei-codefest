import x from '../assets/faresult.json';
import {Classification, Service} from "../types.ts";
import {Group, ScrollArea, Stack, Image, Text, Box} from "@mantine/core";

import result1 from '../assets/result_1.png';
import result2 from '../assets/result_2.png';
import result3 from '../assets/result_3.png';
import result4 from '../assets/result_4.png';
import result5 from '../assets/result_5.png';
import {Location, useLocation} from "react-router-dom";
import {useMemo} from "react";

export default function FaResult() {
  const data: Service[] = x;
  const images = [result1, result2, result3, result4, result5];
  const { state }: Location<Classification> = useLocation();

  const filteredData = useMemo(() => {
    const filtered = data.filter((item) => {
      if (!state) return true;
      if (!state.age && !state.income && !state.residence && !state.disability) return true;
      const cc = item.classification;
      return cc.age.includes(state.age) || cc.income.includes(state.income) || cc.residence.includes(state.residence) || cc.disability.includes(state.disability);
    });

    // Shuffle the filtered array
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered;
  }, [data, state])

  return <div style={{padding: "20px"}}>
    <ScrollArea>
      <Stack>
        {
         filteredData.map((item) => {
            return <>
              <Group key={item.title} gap={10} onClick={() => window.location.href = item.applicationProcessAndLinks}>
                <Image
                  radius="md"
                  fit="contain"
                  w="20%"
                  src={images[Math.floor(Math.random() * images.length)]}
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
