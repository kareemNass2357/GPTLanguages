import React, { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import SimpleImage from '@editorjs/simple-image';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';
import Code from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';

const EditorBlock = () => {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      placeholder: 'Let`s write an awesome story!',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link', 'bold', 'italic']
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author"
          }
        },
        image: {
          class: SimpleImage,
          inlineToolbar: true
        },
        table: {
          class: Table,
          inlineToolbar: true
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              vimeo: true
            }
          }
        },
        code: Code,
        inlineCode: InlineCode
      }
    });

    // Cleanup when the component unmounts
    return () => {
      if (editor) {
        editor.isReady
          .then(() => {
            // editor.destroy();
          })
          .catch((error) => {
            console.error('Error while destroying the editor:', error);
          });
      }
    };
  }, []);

  return (
    <>
      <div className='bg-red-10 pv10'>
        <div className="container mx-auto p-4">
          <div id="editorjs" className="border p-4"></div>
        </div>
      </div>
    </>
  );
};

export default EditorBlock;
