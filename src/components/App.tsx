import React, { useEffect, useState } from "react";

import { Provider } from "react-redux";
import { mainSaga } from "../saga";
import { sagaMiddleware, store } from "../store";
import { ThemeProvider } from "../styles/theme";

import Tabs from "./tabs/tabs.component";

import TransferForm from "./transferForm/TransferForm.component";
import CreateAllowanceFormComponent from "./createAllowanceForm/CreateAllowanceForm.component";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Users } from "./Users";
import { UserView } from "./UserView";

const useClasses = makeStyles({
  usersWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

function App() {
  const classes = useClasses();

  useEffect(() => {
    sagaMiddleware.run(mainSaga);
  }, []);

  const items = [
    { label: "Udostępnij środki", value: "add allowance" },
    { label: "Przeglądaj udostępnione środki", value: "view Allowance" },
    { label: "Wykonaj transfer", value: "transfer" },
  ];

  const [selectedTab, setSelectedTab] = useState(items[0].value);
  const onTabChange = (value: string) => {
    setSelectedTab(value);
  };
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider>
          <div className={classes.usersWrapper}>
            <Users />
          </div>
          <Box>
            <Tabs
              items={items}
              selectedValue={selectedTab}
              onChange={onTabChange}
            />
          </Box>

          <Box paddingX={4}>
            {items[0].value === selectedTab && <CreateAllowanceFormComponent />}
            {items[1].value === selectedTab && <UserView />}
            {items[2].value === selectedTab && <TransferForm />}
          </Box>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
