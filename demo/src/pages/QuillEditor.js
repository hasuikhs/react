import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import './memoEditor.scss';

class QuillEditor extends Component {
  constructor(props) {
    super(props);

    this.reactQuillRef = null;
    this.state = {
      editorHtml: ''
    };

    this.timer = null;
    this.handleValue = this.handleValue.bind(this);
  }

  componentDidMount() {
    if (this.reactQuillRef) {
      const quill = this.reactQuillRef.getEditor();
      const tooltip = quill.theme.tooltip;
      const input = tooltip.root.querySelector('input[data-link]');
      input.dataset.link = 'https://www.example.com';

      const Link = Quill.import('formats/link');

      class CustomLink extends Link {
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

      const Keyboard = Quill.import('modules/keyboard');

      this.reactQuillRef.focus();
    }
  }

  handleValue(html, content, delta) {

    this.debounceFunc({ html, content, delta }, 1000);
    this.setState({
      editorHtml: html
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
      <div id="editor" spellCheck={false} style={{ position: 'absolute', width: '200px', height: '200px', bottom: '300px', left: '500px', zIndex: 201 }}>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={ 'bubble' }
          modules={{
            toolbar: [ 'bold', 'italic', 'underline', 'link' ]
          }}
          formats={ [ 'bold', 'italic', 'underline', 'link' ] }
          style={{ height: '100%' }}
          value={this.state.editorHtml}
          onChange={this.handleValue}
        />
      </div>
    );
  }
}

export default QuillEditor;