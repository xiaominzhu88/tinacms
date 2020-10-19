import React from 'react';
import { useCMS, useForm, usePlugin } from 'tinacms';

function PageContent() {
  //define initialValues as page static content
  const pageData = {
    title: 'Hello!',
  };

  // define form config object
  // 定义表单配置对象
  const formConfig = {
    id: '1', // 表单的唯一标识符， 在用于多个页面的组件内部创建表单时，通常，使用内容的文件名或从内容API返回的唯一键
    label: 'Edit Page', // 页面左边 CMS 的 Label
    fields: [
      // 由字段 定义 组成
      {
        name: 'title', //  这个component return 的 内容， 名字是 editableData.title
        label: 'TITLE', // 左边 CMS 领域里的 Label
        component: 'text', // 左边 使用的 text component 样式
      },

      {
        component: 'select',
        name: 'frontmatter.name',
        label: 'Names',
        description: 'Select an Hello name',
        options: ['Tina', 'React', 'Next', 'Zoooommmbiiee'],
      },
      {
        name: 'description',
        component: 'textarea',
        label: 'Description',
        description: 'Enter the post description here',
      },

      {
        label: 'IMAGE',
        name: 'image.src',
        component: 'image',
        parse: (media) => {
          if (!media) return '';
          return media.id.replace('/static', '');
        },

        // Decide the file upload directory for the page
        uploadDir: () => '/static/public/',

        // Generate the src attribute for the preview image.
        previewSrc: (fullSrc) => fullSrc.replace('/static', ''),
      },
    ],

    initialValues: pageData, // 用于填充表单的数据，如果需要在创建表单时异步加载数据，可以使用loadInitialValues

    // async loadInitialValues() {
    //   return await fetch("https://jsonplaceholder.typicode.com/posts/1").then(
    //     (res) => {
    //       console.log(res);
    //       res.json();
    //     }
    //   );
    // },

    async onSubmit(formData) {
      return await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: formData.title,
          description: formData.description,
          name: formData.frontmatter.name,
          image: formData.image.src, //src:bird.jpg
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((data) => console.log('updated-data: ', data))
        .catch((e) => console.error(e));
    },
  };
  // create Form
  const [editableData, form] = useForm(formConfig);

  // register with CMS
  usePlugin(form);
  console.log('editableData: ', editableData); // initialValues
  return (
    <div>
      {/* render 'editableData' returned from 'useForm' hook */}
      <div
        style={
          editableData?.image && {
            backgroundImage: `url(${editableData?.image.src})`,
            height: '800px',
            width: '100%',
            backgroundRepeat: 'no-repeat',
          }
        }
      >
        <h2>{editableData?.title}</h2>
        <h4>{editableData?.frontmatter?.name}</h4>

        <p>{editableData?.description}</p>
      </div>
      <EditButton />
    </div>
  );
}

export default PageContent;

function EditButton() {
  const cms = useCMS();
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit' : 'Edit Site'}
    </button>
  );
}
