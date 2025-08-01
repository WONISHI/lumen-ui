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


## 加载状态按钮
通过设置 loading 属性为 true 来显示正在加载的状态。

<preview path="../demo/Button/Loading.vue" title="基础用法" description="加载状态按钮"></preview>



## 不同大小的按钮
通过设置 size 属性为 small | large 来调整图标的大小。

<preview path="../demo/Button/Size.vue" title="基础用法" description="加载状态按钮"></preview>


# Button API

## Button Attributes

| 属性名       | 说明                            | 类型                                                           | 默认值 |
| ----------- | ------------------------------- | -------------------------------------------------------------- | ------- |
| size        | 尺寸                            | `enum` - `'large'\| 'small'`                                     | —       |
| type        | 按钮类型，在设置color时，后者优先。  | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain       | 是否为朴素按钮.                   | `boolean`                                                        | false   |
| round       | 是否为圆角按钮.                   | `boolean`                                                        | false   |
| circle      | 是否为圆形按钮.                   | `boolean`                                                        | false   |
| loading     | 是否为加载中状态                  | `boolean`                                                        | false   |
| disabled    | 按钮是否为禁用状态                 | `boolean`                                                        | false   |
| icon        | 图标组件                         | `string`                                                         | —       |
| autofocus   | 原生 autofocus 属性              | `boolean`                                                        | false   |
| native-type | 原生 type 属性                   | `enum` - `'button'\| 'submit'\| 'reset'`                         | button  |

## Button Slots

| 插槽名       | 说明                                                                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------- | 
| default        | 自定义默认内容                                                                                               | 

## Button Exposes

| 属性名 | 说明 | 类型 |
| -----------|------------------------------| --------------------------------------------------------------------------|
| ref | 按钮html 元素 | object |