import { promisify } from "util";
import { List, getPreferenceValues } from "@raycast/api";
import { exec as cExec } from "child_process";
import { useEffect, useState } from "react";

const exec = promisify(cExec);

interface PrecessInfo {
  name: string;
}

const checkList = ["OrbStack"];

const getProcesses = async () => {
  const cmd = "/usr/sbin/lsof +c0 -iTCP -sTCP:LISTEN -P -FpcRuLPn";
  const { stdout, stderr } = await exec(cmd);
  const processes = stdout.split("\np");
  // console.log(processes);
  for (const process of processes) {
    // console.log("process", process);
    if (!process.includes("c" + checkList[0])) continue;
    console.log(process);
    // const lines = process.split("\n");
    // console.log(lines);
    // for (const line of lines) {
    //   const value = line.slice(1);
    //   // console.log(value);
    // }
  }
  // console.log(stderr);

  return [{ name: "test" }];
};

getProcesses();

export default function Command() {
  const [processes, setProcesses] = useState<PrecessInfo[]>([{ name: "test" }]);

  return (
    <List>
      {processes.map((process, index) => (
        <List.Item key={index} title={process.name} />
      ))}
    </List>
  );
}
