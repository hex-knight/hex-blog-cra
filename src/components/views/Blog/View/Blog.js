//import React, { useEffect, useState } from 'react';
import React from 'react';
//import axios from 'axios';
import { Typography } from 'antd';

const { Title } = Typography
//const { Meta } = Card;

function Blog() {

    // const [blogs, setBlogs] = useState([])
    // const apiUrl= process.env.NODE_ENV === 'production' ?
    //         "https://hex-blog-backend.herokuapp.com/":
    //         "http://localhost:5000/";
    // useEffect(() => {
    //     axios.get(apiUrl+'api/blog/getBlogs')
    //         .then(response => {
    //             if (response.data.success) {
    //                 console.log(response.data.blogs)
    //                 setBlogs(response.data.blogs)
    //             } else {
    //                 alert('Couldnt get blog`s lists')
    //             }
    //         })
    // }, [])

    // const renderCards = blogs.map((blog, index) => {
    //     return <Col key={index} lg={8} md={12} xs={24}>
    //         <Card
    //             hoverable
    //             style={{ width: 370, marginTop: 16 }}
    //             actions={[
    //                 <Icon type="setting" key="setting" />,
    //                 <Icon type="edit" key="edit" />,
    //                 <a href={`/blog/post/${blog._id}`}> <Icon type="ellipsis" key="ellipsis" /></a>,
    //             ]}
    //         >
    //             <Meta
    //                 avatar={
    //                     <Avatar src={blog.writer.image} />
    //                 }
    //                 title={blog.writer.name}
    //                 description="This is the description"
    //             />
    //             <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
    //                 <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    //             </div>
    //         </Card>
    //     </Col>
    // })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Blog Lists </Title>
            {/* <Row gutter={[32, 16]}>
                {renderCards}
            </Row> */}
        </div>
    )
}

export default Blog
