// 在项目的根目录下的 env.d.ts 或 global.d.ts 文件中添加：
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $echo: (msg: string) => void;
  }
}
