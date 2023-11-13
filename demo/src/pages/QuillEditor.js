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

    Quill.register('formats/link', CustomLink);

    const Italic = Quill.import('formats/italic');
    Italic.tagName = 'i';
    Quill.register('formats/italic', Italic);

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
              matchers: [
                [ 'p.MsoListParagraph', preserveSizeFormat ]
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

class CustomLink extends Quill.import('formats/link') {
  static sanitize(url) {
    if (!/^(https|http?:\/\/)/.test(url)) {
      return `https://${url}`;
    }

    return super.sanitize(url);
  }

  static create(value) {
    let node = super.create(value);

    node.removeAttribute('rel');

    return node;
  }
}

function preserveSizeFormat(node, delta) {
  const Delta = Quill.import('delta');
  let ops = delta.ops.map((op) => Object.assign({}, op));

  let bulletOp = ops.find((op) => op.insert && op.insert.trim().length);

  if (!bulletOp) { return delta; }

  bulletOp.insert = bulletOp.insert.trimLeft();
  let listPrefix = bulletOp.insert.match(/^.*(^·|\.)/) || bulletOp.insert[0];
  bulletOp.insert = bulletOp.insert.substring(listPrefix[0].length, bulletOp.insert.length).trimLeft();

  let last = ops[ops.length - 1];
  last.insert = last.insert.substring(0, last.insert.length - 1);

  let listType = listPrefix[0].length === 1 ? 'bullet' : 'ordered';

  let style = node.getAttribute('style').replace(/\n+/g, '');
  let levelMatch = style.match(/level(\d+)/);
  let indent = levelMatch ? levelMatch[1] - 1 : 0;

  ops.push({
    insert: '\n',
    attributes: {
      list: listType,
      indent
    }
  });

  return new Delta(ops);
}

export default QuillEditor;
