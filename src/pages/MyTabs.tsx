import {Tabs} from '@mantine/core';
import './MyTabs.css';
import MyTab from "./MyTab.tsx";
import FamTab from "./FamTab.tsx";

export default function MyTabs() {
    return (
      <div className="my-tabs">
        <Tabs defaultValue="my">
          <Tabs.List grow={true}>
            <Tabs.Tab value="my">我的
            </Tabs.Tab>
            <Tabs.Tab value="family" >家人</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="my">
            <MyTab />
          </Tabs.Panel>
          <Tabs.Panel value="family">
            <FamTab/>
          </Tabs.Panel>
        </Tabs>
      </div>
    );
}
