import { Component } from "react";
import QuillEditor from "./QuillEditor";

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
        <h2>count: {this.state.count}</h2>
        <button onClick={() => this.setState({ delete: true })}>Delete</button>
        {this.state.delete ? <></> : <Target />}
        <button onClick={this.handleClick}>bind test</button>

        <InfiniteScrollComponent />
        <Dropdown />
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

export default Class;
