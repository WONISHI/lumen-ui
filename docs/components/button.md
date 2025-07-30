---
title: Button | lumen-ui
description: Button 组件的文档
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 type、plain、round 和 circle 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 禁用状态
使用 disabled 属性来定义按钮是否被禁用

<preview path="../demo/Button/Disable.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 图标按钮
使用 icon 属性来为按钮添加图标。图标名称请看 fontawesome 官网 https://fontawesome.com/icons

<preview path="../demo/Button/Icon.vue" title="基础用法" description="Button 组件的基础用法"></preview>


### Button Attributes

| Name        | Description                            | Type                                                             | Default |
| ----------- | -------------------------------------- | ---------------------------------------------------------------- | ------- |
| size        | button size                            | `enum` - `'large'\| 'small'`                                     | —       |
| type        | button type                            | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain       | determine whether it's a plain button  | `boolean`                                                        | false   |
| round       | determine whether it's a round button  | `boolean`                                                        | false   |
| circle      | determine whether it's a circle button | `boolean`                                                        | false   |
| loading     | determine whether it's loading         | `boolean`                                                        | false   |
| disabled    | disable the button                     | `boolean`                                                        | false   |
| icon        | icon component                         | `string`                                                         | —       |
| autofocus   | same as native button's `autofocus`    | `boolean`                                                        | false   |
| native-type | same as native button's `type`         | `enum` - `'button'\| 'submit'\| 'reset'`                         | button  |
