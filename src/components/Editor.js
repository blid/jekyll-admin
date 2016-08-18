import React, { Component, PropTypes } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/github';

import { toYAML } from '../utils/helpers';

class Editor extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.json !== this.props.json;
  }

  handleChange(value) {
    // TODO better handling
    const { onEditorChange, editorChanged } = this.props;
    if (!editorChanged) {
      onEditorChange();
    }
  }

  getValue() {
    return this.refs.ace.editor.getValue();
  }

  render() {
    const { json } = this.props;
    return (
      <AceEditor
        value={toYAML(json)}
        mode="yaml"
        theme="github"
        width="100%"
        height="400px"
        showGutter={false}
        showPrintMargin={false}
        highlightActiveLine={false}
        className="config-editor"
        ref="ace"
        onChange={() => this.handleChange()}
      />
    );
  }
}

Editor.propTypes = {
  json: PropTypes.object.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  editorChanged: PropTypes.bool.isRequired
};

export default Editor;