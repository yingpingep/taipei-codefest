import "./FamTab.css"
import {
  Flex,
  Text,
  Stack,
  Button,
  TextInput,
  Modal,
  Select,
  MultiSelect,
  Group,
  Card,
  Avatar
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {DateInput} from "@mantine/dates";
import {IconCalendarSearch, IconPencil} from "@tabler/icons-react";

import faava from '../assets/3d_avatar_21.png';
import maava from '../assets/3d_avatar_9.png';
import {Link} from "react-router-dom";
import {useState} from "react";
import {Classification} from "../types.ts";

const categories = {
  'residence': ['設籍臺北', '設籍臺北並實際居住', '其他'],
  'age': ['50歲以上', '55歲以上', '55歲以上且為原住民', '60歲以上', '65歲以上'],
  'disability': ['失智', '身障/失能', '長照等級2以上', '其他'],
  'income': ['低收入', '中低收入', '綜所稅率未達12%', '綜所稅率未達20%']
};

function getCombinations(categories) {
  const keys = Object.keys(categories);
  const values = Object.values(categories);

  function* product(arr, index = 0) {
    if (index === arr.length) {
      yield [];
    } else {
      for (let value of arr[index]) {
        for (let rest of product(arr, index + 1)) {
          yield [value, ...rest];
        }
      }
    }
  }

  const combinations = [];
  for (let combination of product(values)) {
    combinations.push(Object.fromEntries(keys.map((key, i) => [key, combination[i]])));
  }

  return combinations;
}

const combinations = getCombinations(categories);

function Empty() {
  return <Flex justify="center" align="center" style={{height: "calc(100dvh - 162px)"}}>
    <Text c="taipeiGray">點擊新增家人來關注福利及補助</Text>
  </Flex>
}

function PopUpNewFam() {
  return <Stack>
    <Text c="#757575">
      輸入親友的資料來接收相關補助跟福利
    </Text>
    <TextInput
      label="台北通帳號"
      placeholder="請輸入台北通帳號"
    />
    <DateInput
      label="出生年月日"
      placeholder="請選擇出生年月日"
      rightSection={<IconCalendarSearch/>}
    />
    <Select
      label="關係"
      placeholder="請選擇關係"
      data={['母親', '父親', '哥哥', '弟弟', '姊姊', '妹妹']}
    />
    <Select
      label="地區"
      placeholder="請選擇地區"
      data={['設籍台北', '設籍台北且居住', '台中市', '桃園市', '其他']}
    />
    <MultiSelect
      label="身心狀態（可複選）"
      placeholder="請選擇身心狀態"
      data={['失智', '身障/失能', '長照等級2以上', '其他']}
    />
    <Select label="收入狀況" placeholder="請選擇收入狀況"
            data={['低收入', '中低收入', '綜所稅率未達12%', '綜所稅率未達20%']}>
    </Select>
    <Group grow>
      <Button variant="outline" color="gray">
        取消
      </Button>
      <Button>
        確認
      </Button>
    </Group>
  </Stack>
}


function FaDetail({setFad, close}: { setFad: any, close: any }) {
  const fixedValues: any[] = combinations;
  const [income, setIncome] = useState('');
  const [dis, setDis] = useState([])

  return <Stack>
    <Text c="#757575">
      輸入親友的資料來接收相關補助跟福利
    </Text>
    <TextInput
      label="台北通帳號"
      placeholder="請輸入台北通帳號"
      value="wq2463"
    />
    <DateInput
      label="出生年月日"
      placeholder="請選擇出生年月日"
      rightSection={<IconCalendarSearch/>}
      value={new Date()}
    />
    <Select
      label="關係"
      placeholder="請選擇關係"
      data={['母親', '父親', '哥哥', '弟弟', '姊姊', '妹妹']}
      value="父親"
    />
    <Select
      label="地區"
      placeholder="請選擇地區"
      data={['設籍台北', '設籍台北且居住', '台中市', '桃園市', '其他']}
      value="設籍台北"
    />
    <MultiSelect
      label="身心狀態（可複選）"
      placeholder="請選擇身心狀態"
      data={['失智', '身障/失能', '長照等級2以上', '其他']}
      value={dis}
      onChange={(value) => setDis(value)}
    />
    <Select label="收入狀況" placeholder="請選擇收入狀況"
            data={['低收入', '中低收入', '綜所稅率未達12%', '綜所稅率未達20%']}
            value={income}
            onChange={(value) => setIncome(value as string)}
    >

    </Select>
    <Group grow>
      <Button variant="outline" color="gray">
        取消
      </Button>
      <Button onClick={() => {
        const daaa = fixedValues[Math.floor(Math.random() * fixedValues.length)]
        if (income) {
          daaa.income = income
        }
        setFad(daaa);

        if (dis.length > 0) {
          const x = dis.join(',')
          setFad({...daaa, disability: x})
        }

        close()
      }}>
        確認
      </Button>
    </Group>
  </Stack>
}

function MaDetail() {
  return <Stack>
    <Text c="#757575">
      輸入親友的資料來接收相關補助跟福利
    </Text>
    <TextInput
      label="台北通帳號"
      placeholder="請輸入台北通帳號"
      value="w43463"
    />
    <DateInput
      label="出生年月日"
      placeholder="請選擇出生年月日"
      rightSection={<IconCalendarSearch/>}
      value={new Date()}
    />
    <Select
      label="關係"
      placeholder="請選擇關係"
      data={['母親', '父親', '哥哥', '弟弟', '姊姊', '妹妹']}
      value="母親"
    />
    <Select
      label="地區"
      placeholder="請選擇地區"
      data={['設籍台北', '設籍台北且居住', '台中市', '桃園市', '其他']}
      value="設籍台北"
    />
    <MultiSelect
      label="身心狀態（可複選）"
      placeholder="請選擇身心狀態"
      data={['失智', '身障/失能', '長照等級2以上', '其他']}
    />
    <Select label="收入狀況" placeholder="請選擇收入狀況"
            data={['低收入', '中低收入', '綜所稅率未達12%', '綜所稅率未達20%']}>
    </Select>
    <Group grow>
      <Button variant="outline" color="gray">
        取消
      </Button>
      <Button>
        確認
      </Button>
    </Group>
  </Stack>
}

function FamCards() {
  const [faOpened, {open: faOpen, close: faClose}] = useDisclosure(false);
  const [maOpened, {open: maOpen, close: maClose}] = useDisclosure(false);

  const [fad, setFad] = useState({})

  const faTitle = <Text size="24px" fw={700} c="taipeiMain">父親的資料</Text>;
  const maTitle = <Text size="24px" fw={700} c="taipeiMain">母親的資料</Text>;

  return <>
    <Stack gap={10}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{borderColor: "var(--mantine-color-taipeiMain-5)"}}>
        <Card.Section px={40} py={20}>
          <Stack>
            <Group gap={20}>
              <Avatar flex={0} size={60} src={faava} alt="it's me"/>
              <Stack gap={5} w="calc(100% - 80px)">
                <Group justify="space-between">
                  <Text>父親</Text>
                  <IconPencil onClick={faOpen}/>
                </Group>
                <Text c="taipeiGray">帳號: wq2463</Text>
              </Stack>
            </Group>
            <Group gap={20} justify="flex-end">
              <Link to="/fa-result" state={fad}>
                <Button>
                  可用的福利與補助
                </Button>
              </Link>
            </Group>
          </Stack>
        </Card.Section>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder style={{borderColor: "var(--mantine-color-taipeiMain-5)"}}>
        <Card.Section px={40} py={20}>
          <Stack>
            <Group gap={20}>
              <Avatar flex={0} size={60} src={maava} alt="it's me"/>
              <Stack gap={5} w="calc(100% - 80px)">
                <Group justify="space-between">
                  <Text>母親</Text>
                  <IconPencil onClick={maOpen}/>
                </Group>
                <Text c="taipeiGray">帳號: w43463</Text>
              </Stack>
            </Group>
            <Group gap={20} justify="flex-end">
              <Link to="/ma-result">
                <Button>
                  可用的福利與補助
                </Button>
              </Link>
            </Group>
          </Stack>
        </Card.Section>
      </Card>
    </Stack>

    <Modal className="new-fam-modal" opened={faOpened} onClose={faClose} title={faTitle} centered radius={10}>
      <FaDetail setFad={setFad} close={faClose}/>
    </Modal>

    <Modal className="new-fam-modal" opened={maOpened} onClose={maClose} title={maTitle} centered radius={10}>
      <MaDetail/>
    </Modal>

  </>
}

export default function FamTab() {
  const [opened, {open, close}] = useDisclosure(false);

  const modalTitle = <Text size="24px" fw={700} c="taipeiMain">請新增家人資料</Text>;

  return <div className="fam-tab">
    {/*<Empty/>*/}
    <FamCards/>

    <Modal className="new-fam-modal" opened={opened} onClose={close} title={modalTitle} centered radius={10}>
      <PopUpNewFam/>
    </Modal>

    <Button h={56} w="calc(100% - 40px)" color="taipeiMain" pos="absolute" bottom={60} radius={10} onClick={open}>
      <Text size="16px">新增家人</Text>
    </Button>
  </div>
}
