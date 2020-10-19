npx create-react-app

# Install tinacms

yarn add tinacms styled-components

## App.js

### Import TinaProvider & TinaCMS, create an instance of TinaCMS

- [ ] wrap TinaProvider,

- [ ] pass cms,

- [ ] configure sidebar,

```jsx
const cms = new TinaCMS({
    sidebar:true
});
  return (
    <TinaProvider cms={cms}>
      <div className="App">
        <h1>Hello Tina!</h1>
      </div>
    </TinaProvider>
```

### import useCMS

- [ ] access cms

- [ ] toggle cms state with onClick on EditButton

```jsx
function EditButton() {
  const cms = useCMS();
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit' : 'Edit Site'}
    </button>
  );
}
```

## Edit Content

### Create & Register Form with useForm,pass useForm into usePlugin hook

#### import useForm and usePlugin

#### define form config object

```jsx
{
        name: "title",
        label: "TITLE",
        component: "text",
},
{
        component: "select",
        name: "frontmatter.names",
        label: "Names",
        description: "Select an Hello name",
        options: ["Tina", "React", "Next", "Zoooommmbiiee"],
},
{
        name: "description",
        component: "textarea",
        label: "Description",
        description: "Enter the post description here",
}
```

- [ ] 1. create Form

```jsx
const [editableData, form] = useForm(formConfig);
```

### useForm 需要具有属性的表单配置对象，这些属性确定表单在加载和保存时的行为方式，可用的字段以及其他元数据。

- useForm Hook 返回的第一条数据（在上面的示例中为 editableData ）是一个对象，包含可通过表单进行编辑的所有数据。 当用户编辑表单中的数据时，此对象中的值会更改

- useForm Hook 第二条数据（在上面的示例中为 form ）是该挂钩创建的表单对象

- useForm 接收的第一个参数（在上例中为 formConfig ）是用于配置表单的对象 (id, fields,initialValues, onSubmit 是经常性的)

- [ ] 2. register with CMS

```jsx
usePlugin(form);
```

### Fields are added to forms via the fields array and create the editing interface of a form

#### default Field Plugins

```jsx
Text，Textarea，Number，Image，'Color'，Toggle，Select，Tags，List，Group，Group List，Blocks
```

## Track and Save data changes with Backend

（Learning to be updated)

```jsx
async loadInitialValues() {
      return await fetch(
        "https://example"
      ).then((res) => res.json());
    },
```

```jsx
async onSubmit(formData) {
      return await fetch("https://example", {
        method: "PUT",
        body: JSON.stringify({
          id: 1,
          title: formData.title,
          body: formData.body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("returned data: ", data))
        .catch((e) => console.error(e));
    },
```
