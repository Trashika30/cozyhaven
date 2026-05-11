import { DeleteOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Image, Layout, List, Menu, Row, Select, Space, Tabs, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const ViewHotel = () => {

    const [roomTypes, setRoomTypes] = useState([]);

    const addRoomType = () => {
        setRoomTypes([...roomTypes, { roomType: "Standard", rooms: "1 Room" }]);
    };

    const removeRoomType = (index) => {
        let updated = [...roomTypes];
        updated.splice(index, 1);
        setRoomTypes(updated);
    };

    const updateRoomType = (index, key, value) => {
        let updated = [...roomTypes];
        updated[index][key] = value;
        setRoomTypes(updated);
    };

    const items = [
        {
            key: "1",
            label: "Amenities",
            children: (
                <>
                    <Title level={4}>Property Amenities</Title>

                    <List
                        bordered
                        dataSource={["Free WiFi", "Swimming Pool", "Parking", "Air Conditioning", "Gym", "Spa"]}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </>
            )
        },
        {
            key: "2",
            label: "Food & Dining",
            children: (
                <>
                    <Title level={4}>Food & Dining</Title>

                    <List
                        bordered
                        dataSource={["Seafood Restaurant", "Buffet Breakfast", "Beachside Café", "24/7 Room Service"]}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </>
            )
        },
        {
            key: "3",
            label: "Guest Reviews",
            children: (
                <>
                    <Title level={4}>Guest Reviews</Title>

                    <Card style={{ marginBottom: 15 }}>
                        <Title level={5}>⭐ 5.0 – Priya Sharma</Title>

                        <Paragraph>
                            Amazing stay! The beach view from the room was stunning.
                        </Paragraph>
                    </Card>

                    <Card style={{ marginBottom: 15 }}>
                        <Title level={5}>⭐ 4.7 – Rahul Mehta</Title>

                        <Paragraph>
                            Rooms were very clean and spacious.
                        </Paragraph>
                    </Card>

                    <Card>
                        <Title level={5}>⭐ 4.6 – Karthik Reddy</Title>

                        <Paragraph>
                            Great location near the beach.
                        </Paragraph>
                    </Card>
                </>
            )
        },
        {
            key: "4",
            label: "Location",
            children: (
                <>
                    <Title level={4}>Location</Title>

                    <Paragraph>Calangute Beach Road, Goa</Paragraph>
                </>
            )
        },
        {
            key: "5",
            label: "Contact",
            children: (
                <>
                    <Title level={4}>Contact Details</Title>

                    <Paragraph>📞 +91 9876543210</Paragraph>

                    <Paragraph>📧 reservations@grandseaside.com</Paragraph>
                </>
            )
        }
    ];

    return (
        <Layout style={{ minHeight: "100vh", background: "#F8F5F0" }}>

            <Header
                style={{
                    background: "#F8F5F0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 60px"
                }}
            >

                <Title level={3} style={{ color: "#9C0A8F", margin: 0 }}>
                    CozyHaven
                </Title>

                <Menu
                    mode="horizontal"
                    style={{ background: "#F8F5F0", border: "none" }}
                    items={[
                        {
                            key: "1",
                            label: <Link to="/">Home</Link>
                        },
                        {
                            key: "2",
                            label: <Link to="/hotels">Hotels</Link>
                        },
                        {
                            key: "3",
                            label: (
                                <Button type="primary" style={{ background: "#9C0A8F" }}>
                                    Sign In
                                </Button>
                            )
                        }
                    ]}
                />

            </Header>

            <Content style={{ padding: "40px 70px" }}>

                <Row justify="space-between" align="middle">

                    <Col>
                        <Title level={2}>Grand Seaside Resort</Title>

                        <Paragraph>📍 Calangute Beach, North Goa</Paragraph>

                        <Paragraph>1247 reviews</Paragraph>
                    </Col>

                    <Col>
                        <Button
                            type="primary"
                            icon={<StarFilled />}
                            style={{ background: "#9C0A8F" }}
                        >
                            4.8
                        </Button>
                    </Col>

                </Row>

                <Row gutter={24} style={{ marginTop: 20 }}>

                    <Col span={16}>

                        <Image
                            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                            style={{ borderRadius: "16px" }}
                        />

                    </Col>

                    <Col span={8}>

                        <Card style={{ borderRadius: "16px" }}>

                            <Title level={3}>₹6000 / night</Title>

                            <Text type="secondary">
                                Excludes taxes and fees
                            </Text>

                            <div style={{ marginTop: 20 }}>
                                <Text>Check-in</Text>

                                <DatePicker
                                    style={{ width: "100%", marginTop: 5 }}
                                />
                            </div>

                            <div style={{ marginTop: 15 }}>
                                <Text>Check-out</Text>

                                <DatePicker
                                    style={{ width: "100%", marginTop: 5 }}
                                />
                            </div>

                            <div style={{ marginTop: 15 }}>
                                <Text>Adults</Text>

                                <Select
                                    defaultValue="1"
                                    style={{ width: "100%", marginTop: 5 }}
                                    options={[
                                        { value: "1", label: "1" },
                                        { value: "2", label: "2" },
                                        { value: "3", label: "3" },
                                        { value: "4", label: "4" }
                                    ]}
                                />
                            </div>

                            <div style={{ marginTop: 15 }}>
                                <Text>Children</Text>

                                <Select
                                    defaultValue="0"
                                    style={{ width: "100%", marginTop: 5 }}
                                    options={[
                                        { value: "0", label: "0" },
                                        { value: "1", label: "1" },
                                        { value: "2", label: "2" },
                                        { value: "3", label: "3" }
                                    ]}
                                />
                            </div>

                            {
                                roomTypes.map((room, index) => (
                                    <Space key={index} style={{ width: "100%", marginTop: 15 }}>

                                        <Select
                                            value={room.roomType}
                                            style={{ width: 140 }}
                                            onChange={(value) => updateRoomType(index, "roomType", value)}
                                            options={[
                                                { value: "Standard", label: "Standard" },
                                                { value: "Deluxe", label: "Deluxe" },
                                                { value: "Suite", label: "Suite" }
                                            ]}
                                        />

                                        <Select
                                            value={room.rooms}
                                            style={{ width: 120 }}
                                            onChange={(value) => updateRoomType(index, "rooms", value)}
                                            options={[
                                                { value: "1 Room", label: "1 Room" },
                                                { value: "2 Rooms", label: "2 Rooms" },
                                                { value: "3 Rooms", label: "3 Rooms" }
                                            ]}
                                        />

                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => removeRoomType(index)}
                                        />

                                    </Space>
                                ))
                            }

                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                style={{
                                    marginTop: 20,
                                    background: "#9C0A8F",
                                    width: "100%"
                                }}
                                onClick={addRoomType}
                            >
                                Add Room Type
                            </Button>

                            <Button
                                type="primary"
                                size="large"
                                style={{
                                    marginTop: 15,
                                    background: "#9C0A8F",
                                    width: "100%"
                                }}
                            >
                                Book Now
                            </Button>

                        </Card>

                    </Col>

                </Row>

                <Card style={{ marginTop: 30, borderRadius: "16px" }}>

                    <Title level={3}>About this property</Title>

                    <Paragraph>
                        Experience luxury by the beach at Grand Seaside Resort.
                        Our premium rooms offer stunning ocean views,
                        modern amenities, and exceptional service.
                    </Paragraph>

                </Card>

                <Card style={{ marginTop: 30, borderRadius: "16px" }}>

                    <Tabs items={items} />

                </Card>

            </Content>

        </Layout>
    );
};

export default ViewHotel;