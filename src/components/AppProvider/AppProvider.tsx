"use client"; // Обязательно, так как ConfigProvider использует контекст
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient"; 

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider
             wave={{ disabled: true }} 
            theme={{
              hashed: false,
              token: {
                colorBgLayout: "transparent",
                colorBgContainer: "transparent",
                colorBgElevated: "transparent",
              },
               components: {
                Button: {
                  controlOutline: "none",
                  boxShadow: "none",
                },
                Layout: {
                  headerBg: "transparent",
                  footerBg: "transparent",
                  headerPadding: 0,
                  headerHeight: "auto",
                },
                Menu: {
                  itemBg: "transparent",
                  activeBarBorderWidth: 0,
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </Provider>
  );
}
