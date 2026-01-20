"use client";

import Head from "next/head";
import {Tabs, TabList, Tab, TabPanels, TabPanel} from "@/shared/ui/Tabs";
import {AtlasList} from "@/features/atlas";
import {ClinicalCasesList} from "@/features/clinical-case/ui/clinical-cases-list";


export default function AdminHomePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Head>
                <title>Админ-панель</title>
            </Head>
            <h1 className="text-3xl font-bold mb-8 text-center">Админ-панель</h1>
            <Tabs>
                <TabList aria-label="Tabs">
                    <Tab id="pathhology">Атлас</Tab>
                    <Tab id="cases">Клинические кейсы</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel id="pathhology" className="flex items-center justify-center">
                        <div className="w-full flex flex-col">
                            <AtlasList className="mb-6" adminList/>
                        </div>
                    </TabPanel>
                    <TabPanel id="cases" className="flex items-center justify-center">
                        <div className="w-full flex flex-col">
                            <ClinicalCasesList adminList className="mb-6"/>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
