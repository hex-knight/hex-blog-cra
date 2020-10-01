import React, { Component } from 'react';
//import firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Row, Pagination, Spin } from 'antd';
import './Blog.css';
//import logo from '../../../../j';
import BlogList from '../../../commons/Lists/BlogList';
//import SearchBlog from '../../../commons/SearchBlog/SearchBlog';
import GridOnIcon from '@material-ui/icons/GridOn';
import TocIcon from '@material-ui/icons/Toc';


import BlogContext from '../../../../contex/context'
import { LoadingOutlined } from '@ant-design/icons';


const antIcon = <LoadingOutlined style={{fontSize:40}} spin />
class Blogs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            cards: [],
            totalItems: 0,
            page: 1,
            pageSize: 3,
            dataSet: [{id:''}],
            ids: [],
            spining: false
        }
    }

    static contextType = BlogContext;

    UNSAFE_componentWillMount() {
        var starCountRef = firebase.database().ref('Blogs/');
        starCountRef.on('value', async snapshot => {
            //console.log(Object.getOwnPropertyNames(snapshot.val()));
            if (snapshot.val() === null) {
                this.setState({
                    cards: (
                        [<h5>No existen blogs disponibles :(</h5>]
                    )
                })
            } else {
                const ids = Object.getOwnPropertyNames(snapshot.val()).reverse();
                let values = Object.values(snapshot.val()).reverse();
                let content = values.map((entry, index)=>{
                    // entry = {...entry}
                    // entry.postId=ids[index];
                    return entry={
                        ...entry,
                        idBlog: ids[index]
                    }
                })
                console.log("content ids: ",content)
                console.log("ids: ",ids)
                this.context.changeDataSet(content);
                this.setState({
                    totalItems: content.length,
                    dataSet: content,
                    ids: ids,
                    isLoading: false
                });
            }
        });
    }





    changePagination = (page, pageSize) => {
        this.setState({ spining: true })
        setTimeout(() => {
            this.setState({ page: page });
            setTimeout(() => {
                this.setState({ spining: false })
            }, 80);

        }, 300);
    }

    renderPagination = () => {
        return (
            <Pagination
                size="small"
                className="pagination"
                total={this.state.totalItems}
                defaultCurrent={this.state.page}
                pageSize={this.state.pageSize}
                onChange={(page, pageSize) => this.changePagination(page, pageSize)}
                current={this.state.page}
            />
        )
    }


    render() {
        
        return (
            <Spin indicator={antIcon} spinning={this.state.isLoading} >
            <div className="cards">
                <div className="functions">
                {/* <SearchBlog dataSet={this.state.dataSet} /> */}
                    <div className="page-buttons">
                        {this.renderPagination()}
                    </div>
                    <div
                        onClick={this.context.changeDisplayMode}
                        className="display-buttons">
                        {this.context.displayMode === 'grid' ?
                            <TocIcon /> : <GridOnIcon />
                        }
                    </div>
                </div>
                <Spin indicator={antIcon} spinning={this.state.spining}>
                    <Row gutter={{ xs: 8, sm: 12, md: 12, lg: 24 }}>
                        <BlogList
                            displayMode={this.context.displayMode}
                            dataSet={this.state.dataSet}
                            //ids={this.state.ids}
                            page={this.state.page}
                            pageSize={this.state.pageSize}
                        />
                    </Row>
                </Spin>
                {this.renderPagination()}
            </div>
            </Spin>
        )
    }
}


export default Blogs
