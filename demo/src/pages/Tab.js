import React, { Component } from 'react';

class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'tab1',
      tabData: {
        tab1: { content: 'Content for Tab 1', scrollPosition: 0 },
        tab2: { content: 'Content for Tab 2', scrollPosition: 0 }
      }
    };

    this.contentRef = React.createRef();
  }

  handleTabChange = (tab) => {
    const scrollPosition = this.contentRef.current.scrollTop;
    this.setState(prevState => ({
      tabData: {
        ...prevState.tabData,
        [prevState.activeTab]: { 
          ...prevState.tabData[prevState.activeTab], 
          scrollPosition 
        }
      },
      activeTab: tab
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab) {
      const scrollPosition = this.state.tabData[this.state.activeTab].scrollPosition;
      this.contentRef.current.scrollTop = scrollPosition;
    }
  }

  render() {
    const { activeTab, tabData } = this.state;

    return (
      <div>
        <button onClick={() => this.handleTabChange('tab1')}>Tab 1</button>
        <button onClick={() => this.handleTabChange('tab2')}>Tab 2</button>
        <div ref={this.contentRef} style={{ height: '200px', overflow: 'auto' }}>
          {tabData[activeTab].content}
          {/* 여기에 탭 컨텐츠 렌더링 */}
        </div>
      </div>
    );
  }
}


export default Tab;