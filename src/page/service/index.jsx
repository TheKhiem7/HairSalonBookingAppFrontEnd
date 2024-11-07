
import { Card, Col, Row } from 'antd';
import './index.css'; // Nhớ tạo file CSS này
import { BasePage } from '../../components/BasePage';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const hairServices = [
    {
        title: 'Cắt tóc',
        description: 'Giá từ 100.000đ',
        image: 'https://media.istockphoto.com/id/640274128/vi/anh/th%E1%BB%A3-c%E1%BA%AFt-t%C3%B3c-s%E1%BB%AD-d%E1%BB%A5ng-k%C3%A9o-v%C3%A0-l%C6%B0%E1%BB%A3c.jpg?s=612x612&w=0&k=20&c=o82ARZnhqPdFAqU6WOWLnnP-Z7dGi22crXtevsOguAU=', // Thay thế bằng link hình ảnh thực tế
    },
    {
        title: 'Uốn định hình',
        description: 'Giá từ 379.000đ',
        image: 'https://lamia.com.vn/storage/uon-toc-mohican-dep.jpg', // Thay thế bằng link hình ảnh thực tế
    },
    {
        title: 'Thay đổi màu tóc',
        description: 'Giá từ 199.000đ',
        image: 'https://barber-shop.vn/wp-content/uploads/2019/08/nhuom-toc-nam-2.jpg', // Thay thế bằng link hình ảnh thực tế
    },
];

const spaServices = [
    {
        title: 'Gội Massage Relax',
        description: 'Giá từ 50.000đ',
        image: 'https://watermark.lovepik.com/photo/20211202/large/lovepik-male-customer-washing-hair-picture_501431968.jpg', // Thay thế bằng link hình ảnh thực tế
    },
    {
        title: 'Lấy ráy tai êm',
        description: 'Giá từ 70.000đ',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa8mLD2nLL_wpK3z-wc8o6j3EcuulKh_Mnxw&s', // Thay thế bằng link hình ảnh thực tế
    },
    {
      title: 'Cạo râu, Cạo mặt',
      description: 'Giá từ 40.000đ',
      image: 'https://png.pngtree.com/thumb_back/fw800/background/20230329/pngtree-barber-shaving-bearded-man-with-retro-knife-up-face-razor-photo-image_51116810.jpg', // Thay thế bằng link hình ảnh thực tế
  },
];

const ServicePage = () => {
    return (
      <BasePage>
        <div className="service-container">
            <h1 style={{ marginRight: '700px' }}> <img src='https://cdn-icons-png.flaticon.com/128/32/32069.png' style={{width: '30px'}}/> DỊCH VỤ TÓC</h1>
            <Row gutter={16} justify="center">
                {hairServices.map((service, index) => (
                    <Col span={8} key={index}>
                        <Card
                        style={{backgroundColor: 'lightgray'}}
                            hoverable
                            className="service-card"
                            cover={<img alt={service.title} src={service.image} />}
                        >
                        
                            <div style={{marginBottom: '230px', position: 'relative'}}>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <Link to={`/service/${service.title}`} style={{ position: 'absolute', top: '80px' }}>Tìm hiểu thêm <RightOutlined /></Link>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h1 style={{ marginTop: '60px', marginRight: '700px' }}> <img src='https://cdn-icons-png.flaticon.com/128/7305/7305214.png' style={{width: '30px'}}/> SPA & RELAX</h1> 
            <Row gutter={16} justify="center">
                {spaServices.map((service, index) => (
                    <Col span={8} key={index}>
                        <Card
                        style={{backgroundColor: 'lightgray'}}
                            hoverable
                            className="service-card"
                            cover={<img alt={service.title} src={service.image} />}
                        >
                            <div style={{marginBottom: '230px', position: 'relative'}}>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <Link to={`/service/${service.title}`} style={{ position: 'absolute', top: '80px' }}>Tìm hiểu thêm <RightOutlined /></Link>
                            </div>
                            
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
        </BasePage>
    );
};

export default ServicePage;
