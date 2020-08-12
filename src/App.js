import React, { Component } from 'react';
import './App.css'

import store from './store/store'


class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: store.getState().filter(item => !item.checked),
      dones: store.getState().filter(item => item.checked),
    }
  }
  componentDidMount() {
    // 使用 store 的 subscribe 设置监听函数
    // subscribe 会在 state 发生改变的时候执行
    store.subscribe(() => {
      this.setState({
        todos: store.getState().filter(item => !item.checked),
        dones: store.getState().filter(item => item.checked),
      });
    });
  }
  // 添加todo
  add(e) {
    if (e.keyCode === 13) {
      store.dispatch({
        type: 'ADD_ACTION',
        payload: e.target.value
      })
      e.target.value = '';
    }
  }
  // 切换todo
  toggle(id) {
    store.dispatch({
      type: 'TOGGLE_ACTION',
      payload: id
    })
  }
  // 删除todo
  del(id) {
    store.dispatch({
      type: 'DEL_ACTION',
      payload: id
    })
  }
  change(id, todo) {
    store.dispatch({
      type: 'CHANGE_ACTION',
      payload: { id, todo }
    })
  }
  render() {
    return (
      <div className="App">
        <header>
          <div className="content">
            <h1>ToDoList</h1>
            <input type="text" placeholder="添加ToDo"
              onKeyDown={(e) => { this.add(e) }} />
          </div>
        </header>

        <section>
          <div className="content">
            <div className="head">
              <h2>正在进行</h2>
              <span>{this.state.todos.length}</span>
            </div>

            <ul>
              {
                this.state.todos.map(item => {
                  return (
                    <li key={item.id}>
                      <div>
                        {/* 点击改变todo选中状态 */}
                        <input type="checkbox" checked={item.checked} onChange={() => {
                          this.toggle(item.id);
                        }} />
                        {/* 聚焦时显示边框   离焦时发送 action 改变todo */}
                        <input type="text" className="change" defaultValue={item.todo}
                          onFocus={(e) => {
                            e.target.style.border = "1px solid #ccc";
                          }} onBlur={(e) => {
                            e.target.style.border = "none";
                            this.change(item.id, e.target.value);
                          }} />
                      </div>
                      {/* 点击删除todo */}
                      <span className="del" onClick={() => { this.del(item.id) }}>X</span>
                    </li>
                  )
                })
              }
            </ul>
            <div className="head">
              <h2>已经完成</h2>
              <span>{this.state.dones.length}</span>
            </div>
            <ul>
              {
                this.state.dones.map(item => {
                  return (
                    <li key={item.id}>
                      <div>
                        <input type="checkbox" checked={item.checked} onChange={() => {
                          this.toggle(item.id);
                        }} />
                        <span>{item.todo}</span>
                      </div>
                      <span className="del" onClick={() => { this.del(item.id) }}>X</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>

        </section>

      </div>
    );
  }
}

export default App;
