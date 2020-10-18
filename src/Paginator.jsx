import React, { Component } from 'react';

import "./MessageList.css"

import { Select } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

const { Option } = Select;


class Message extends Component {


    set_page_size = (value) => {
        this.props.set_page_size(value)
    }

    set_start_index = (page_value) => {
        const start_index = ((page_value - 1) * this.props.page_size)
        this.props.set_start_index(start_index)
    }

    next = () => {
        const start_index = (this.props.page * this.props.page_size) + this.props.page_size
        this.props.set_start_index(start_index)
    }

    previous = () => {
        const start_index = (this.props.page * this.props.page_size) - this.props.page_size
        this.props.set_start_index(start_index)
    }

    render() {

        const options = []
        for (let i = 0; i < this.props.page_count; i++) {
            options.push(<Option value={i + 1} />)
        }

        return <div className="paginator">
            <span> Messages per page: </span>
            <Select onChange={this.set_page_size} defaultActiveFirstOption={true}
                style={{ marginLeft: 5 }} value={"" + (this.props.page_size)}>
                <Option value={50} />
                <Option value={100} />
                <Option value={250} />
            </Select>

            <span onClick={this.previous} style={{ cursor: 'pointer', marginRight: 10, marginLeft: 50 }} > <LeftOutlined /> </span>
            <span> Page
                <Select value={"" + (this.props.page + 1)} onChange={this.set_start_index}
                    style={{ marginLeft: 5, marginRight: 5, minWidth: 50}} showSearch >
                    {options}
                </Select>
                of {this.props.page_count}
            </span>
            <span onClick={this.next} style={{ cursor: 'pointer', marginLeft: 10 }} > <RightOutlined /> </span>




        </div>
    }
}

export default Message;