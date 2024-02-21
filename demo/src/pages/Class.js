import { Component } from "react";
import QuillEditor from "./QuillEditor";

import './class.scss';

let timer = null;

class Class extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      count: 1,
      delete: false,
    };
  }

  componentDidMount() {
    console.log("componentDidMount!");

    timer = setInterval(() => {
      if (this.state.count >= 5) {
        clearInterval(timer);
        this.setState({
          count: 0,
        });
      } else {
        this.setState({
          count: this.state.count + 1,
        });
      }
    }, 1_000);
  }

  componentWillUnmount() {
    console.log("Class componentWillUnmount!");

    if (timer) {
      clearInterval(timer);
    }
  }

  handleClick() {
    alert("Button clicked!");
  }

  render() {
    console.log("render!");

    return (
      <>
        <h1>class</h1>
        {/* <h2>count: {this.state.count}</h2>
        <button onClick={() => this.setState({ delete: true })}>Delete</button>
        {this.state.delete ? <></> : <Target />}
        <button onClick={this.handleClick}>bind test</button>

        <InfiniteScrollComponent />
        <Dropdown />
        <Modal />
        <DropdownMenu /> */}
        <ExpandableComponent />
      </>
    );
  }
}

class Target extends Component {
  componentWillUnmount() {
    console.log("Target componentWillUnmount");
  }

  render() {
    return <>Target</>;
  }
}

class InfiniteScrollComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    };
    this.observer = null;
  }

  componentDidMount() {
    this.loadItems();
    this.createObserver();
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  loadItems = () => {
    this.setState({ loading: true });
    // 데이터 로드 로직 (예: API 호출)
    // 예시를 위해 setTimeout 사용
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: `item-${this.state.itemCount + i}`,
        content: `아이템 ${this.state.itemCount + i}`
      }));

      this.setState(prevState => ({
        items: [...prevState.items, ...newData], // newData는 추가된 데이터
        loading: false
      }));
    }, 1000);
  };

  createObserver = () => {
    this.observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        this.loadItems();
      }
    }, { threshold: 1.0 });

    const sentinel = document.querySelector('#sentinel');
    if (sentinel) {
      this.observer.observe(sentinel);
    }
  };

  render() {
    return (
      <div style={{ width: '300px', height: '400px', overflowY: 'scroll' }}>
        {this.state.items.map(item => (
          // <div key={item.id} style={{ width: '100%', height: '40px', border: '1px solid black' }} >{item.content}</div> // 아이템 렌더링
          <QuillEditor />
        ))}
        {this.state.loading && <div>Loading...</div>}
        <div id="sentinel" /> {/* 감시할 요소 */}
      </div>
    );
  }
}

const menuData = [
  { title: 'first', child: [{ title: '1' }] },
  { title: 'second' },
];

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndexes: []
    };
  }

  // 메뉴 아이템 클릭 핸들러
  handleItemClick = (index) => {
    const { activeIndexes } = this.state;
    const currentIndexPosition = activeIndexes.indexOf(index);

    if (currentIndexPosition > -1) {
      this.setState({
        activeIndexes: activeIndexes.filter((i) => i !== index)
      });
    } else {
      this.setState({
        activeIndexes: [...activeIndexes, index]
      });
    }
  };

  renderMenuItems = (items, depth = 0) => {
    const { activeIndexes } = this.state;
    return items.map((item, index) => {
      const currentIndex = depth + '-' + index;
      const isActive = activeIndexes.includes(currentIndex);

      return (
        <div key={currentIndex} style={{ marginLeft: depth * 20 }}>
          <button onClick={() => this.handleItemClick(currentIndex)}>
            {item.title}
          </button>
          {isActive && item.child && this.renderMenuItems(item.child, currentIndex)}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        {this.renderMenuItems(menuData)}
      </div>
    );
  }
}

class Modal extends Component {
  constructor(props) {
    super(props);
    
    // 모달의 내용을 관리하는 상태
    this.state = {
      content: '초기 내용'
    };
  }

  // 내용을 업데이트하는 함수
  updateContent = () => {
    this.setState({ content: '내용이 변경되었습니다!' });
  }

  render() {
    return (
      <div style={{border: '1px solid black', padding: '20px'}}>
        {/* 상태에 따라 내용을 보여줌 */}
        <p>{this.state.content}</p>

        {/* 버튼 클릭 시 updateContent 함수 호출 */}
        <button onClick={this.updateContent}>내용 바꾸기</button>
      </div>
    );
  }
}

class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.menuRef = null;
    this.state = {
      activeMenu: 'main',
      menuHeight: null,
    };
  }

  setMenuRef = el => {
    this.menuRef = el;
    this.calcHeight(el);
  }

  calcHeight = (el) => {
    if (el) {
      const height = el.offsetHeight;
      this.setState({ menuHeight: height });
    }
  };

  setActiveMenu = (menuName) => {
    this.setState({ activeMenu: menuName }, () => {
      if (this.menuRef) {
        this.calcHeight(this.menuRef);
      }
    });
  };

  renderDropdownItem = (props) => {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={(e) => {
          e.preventDefault();
          props.goToMenu && this.setActiveMenu(props.goToMenu);
        }}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  };

  render() {
    const { activeMenu, menuHeight } = this.state;

    return (
      <div className="dropdown" style={{ height: menuHeight }}>
        {activeMenu === 'main' && (
          <div className="menu" ref={this.setMenuRef}>
            {this.renderDropdownItem({ goToMenu: 'setting', children: 'go to secondary' })}
            {this.renderDropdownItem({ children: 'My setting' })}
          </div>
        )}

        {activeMenu === 'setting' && (
          <div className="menu" ref={this.setMenuRef}>
            {this.renderDropdownItem({ goToMenu: 'main', children: 'first' })}
            {this.renderDropdownItem({ children: 'My setting' })}
            {this.renderDropdownItem({ children: 'My setting' })}
            {this.renderDropdownItem({ children: 'My setting' })}
            {this.renderDropdownItem({ children: 'My setting' })}
            {this.renderDropdownItem({ children: 'My setting' })}
            {this.renderDropdownItem({ children: 'My setting' })}
          </div>
        )}
      </div>
    );
  }
}

class ExpandableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isFocused: false };
    this.elementRef = null;
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  }

  handleBlur = () => {
    this.setState({ isFocused: false }, () => {
      const element = this.elementRef;
      const height = element.scrollHeight + "px";
      element.style.height = height; // 현재 높이를 고정값으로 설정
      // 애니메이션을 위한 reflow 강제
      // element.offsetHeight;
      element.style.height = "210px";
    });
  }

  componentDidUpdate(_, prevState) {
    const { isFocused } = this.state;
    if (isFocused !== prevState.isFocused && isFocused) {
      const element = this.elementRef;
      // 포커스가 들어오면 높이를 auto로 설정
      element.style.height = "auto";
    }
  }

  render() {
    const { isFocused } = this.state;
    return (
      <div
        ref={el => this.elementRef = el}
        className={`element-class ${isFocused ? 'expanded' : ''}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        contentEditable
      >
        { 'test' }
      </div>
    );
  }
}

export default Class;
