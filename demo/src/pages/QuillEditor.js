import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './memoEditor.scss';

class QuillEditor extends Component {
  constructor(props) {
    super(props);

    this.reactQuillRef = null;
    this.state = {
      editorHtml: '',
    };

    this.timer = null;
    this.handleValue = this.handleValue.bind(this);
  }

  componentDidMount() {
    const quill = this.reactQuillRef.getEditor();
    const tooltip = quill.theme.tooltip;
    const input = tooltip.root.querySelector('input[data-link]');
    input.dataset.link = 'https://www.example.com';

    class CustomLink extends Quill.import('formats/link') {
      static sanitize(url) {
        if (!/^(https|http?:\/\/)/.test(url)) {
          return `https://${ url }`;
        }

        return super.sanitize(url);
      }

      static create(value) {
        let node = super.create(value);

        node.removeAttribute('rel');

        return node;
      }
    }
    Quill.register(CustomLink);

    const Italic = Quill.import('formats/italic');
    Italic.tagName = 'i';
    Quill.register(Italic);

    const Clipboard = quill.getModule('clipboard');
    // Clipboard.DEFAULTS.matchVisual = false;

    const Delta = Quill.import('delta');

    Clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      const plainText = node.innerText;
      console.log('??')
      return new Delta().insert(plainText);
    })

    // quill.keyboard.addBinding(
    //   {
    //     key: 'B',
    //     ctrlKey: true
    //   },
    //   {},
    //   (range, context) => {
    //     console.log('hi?')
    //     quill.format('bold', !context.format['bold']);
    //     return false;
    //   }
    // );

    // quill.keyboard.addBinding(
    //   {
    //     key: 'U',
    //     ctrlKey: true
    //   },
    //   (range, context) => {
    //     quill.format('underline', !context.format['underline']);
    //     return false;
    //   }
    // );

    

    quill.clipboard.addMatcher('B', function(node, delta) {
      console.log('dd')
      return delta.compose(new Delta().retain(delta.length(), { bold: true }));
    });

    this.reactQuillRef.focus();
  }

  handleValue(html, content, delta, source) {
    this.debounceFunc({ html, content, delta, source }, 1000);
    this.setState({
      editorHtml: html,
    });
  }

  debounceFunc(value, delay) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      console.log(value);
    }, delay);
  }

  render() {
    return (
      <div
        id="editor"
        spellCheck={false}
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          bottom: '300px',
          left: '500px',
          zIndex: 201,
        }}
      >
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={'bubble'}
          modules={{
            toolbar: ['bold', 'italic', 'underline', 'link'],
            clipboard: {
              // 이벤트 핸들러를 사용하여 붙여넣기한 내용을 처리
              matchers: [
                ['p.MsoListParagraphCxSpFirst', function(node, delta) {
                  // MS Word에서 리스트의 첫 번째 항목 처리
                  return delta;
                }],
                ['p.MsoListParagraphCxSpMiddle', function(node, delta) {
                  // MS Word에서 리스트의 중간 항목 처리
                  return delta;
                }],
                ['p.MsoListParagraphCxSpLast', function(node, delta) {
                  // MS Word에서 리스트의 마지막 항목 처리
                  return delta;
                }]
              ]
            }
          }}
          formats={['bold', 'italic', 'underline', 'link']}
          style={{ height: '100%' }}
          value={this.state.editorHtml}
          onChange={this.handleValue}
        />
      </div>
    );
  }
}

export default QuillEditor;
