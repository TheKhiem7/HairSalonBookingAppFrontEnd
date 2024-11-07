import { useState } from "react";
import styled from "styled-components";
import { Building, Building2, MapPin, Receipt } from "lucide-react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import { BasePage } from "../../components/BasePage";
const stylists = [
    {
        name: "Nguyễn Hoàng",
        location: "HCM",
        experience: "10 năm kinh nghiệm",
        description:
            "Anh Hoàng là một stylist chuyên nghiệp, có kinh nghiệm lâu năm trong ngành tóc. Anh đã từng làm việc tại các salon nổi tiếng ở HCM. Anh có khả năng tư vấn và thực hiện các kiểu tóc phù hợp với khuôn mặt và phong cách của khách hàng.",
        price: "500,000 VND / 1 dịch vụ",
        avatar: "https://github.com/shadcn.png",
        rating: 5,
    },
    {
        name: "Trần Anh Tuấn",
        location: "Hà Nội",
        experience: "7 năm kinh nghiệm",
        description:
            "Anh Tuấn là một nhà tạo mẫu đầy sáng tạo, có khả năng tư vấn phong cách thời thượng và phù hợp với xu hướng hiện tại.",
        price: "450,000 VND / 1 dịch vụ",
        avatar: "https://via.placeholder.com/150",
        rating: 4,
    },
    {
        name: "Phạm Huyền",
        location: "Đà Nẵng",
        experience: "5 năm kinh nghiệm",
        description:
            "Chị Huyền chuyên tạo kiểu cho khách hàng nữ với phong cách hiện đại và cá tính, rất được khách hàng yêu thích.",
        price: "600,000 VND / 1 dịch vụ",
        avatar: "https://via.placeholder.com/150",
        rating: 4.8,
    },
    {
        name: "Nguyễn Thanh Bình",
        location: "HCM",
        experience: "12 năm kinh nghiệm",
        description:
            "Anh Bình là một chuyên gia về tạo kiểu tóc nam, có nhiều kinh nghiệm tại các salon nổi tiếng.",
        price: "550,000 VND / 1 dịch vụ",
        avatar: "https://via.placeholder.com/150",
        rating: 4.2,
    },
    {
        name: "Nguyễn Đức Hoản",
        location: "HCM",
        experience: "12 năm kinh nghiệm",
        description:
            "Anh Hoản là một chuyên gia về tạo kiểu tóc nam, có nhiều kinh nghiệm tại các salon nổi tiếng.",
        price: "550,000 VND / 1 dịch vụ",
        avatar: "https://via.placeholder.com/150",
        rating: 4.3,
    },
    {
        name: "Nguyễn Thanh Tú",
        location: "HCM",
        experience: "12 năm kinh nghiệm",
        description:
            "Anh Tú là một chuyên gia về tạo kiểu tóc nam, có nhiều kinh nghiệm tại các salon nổi tiếng.",
        price: "550,000 VND / 1 dịch vụ",
        avatar: "https://via.placeholder.com/150",
        rating: 4.6,
    },
    {
        name: "Nguyễn Mạnh An",
        location: "HCM",
        experience: "12 năm kinh nghiệm",
        description:
            "Anh An là một chuyên gia về tạo kiểu tóc nam, có nhiều kinh nghiệm tại các salon nổi tiếng.",
        price: "550,000 VND / 1 dịch vụ",
        avatar: "https://via.placeholder.com/150",
        rating: 4.7,
    },
];

export default function StylistPage() {
    const [selectedLocations, setSelectedLocations] = useState([]);

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setSelectedLocations((prev) =>
            prev.includes(value)
                ? prev.filter((loc) => loc !== value)
                : [...prev, value]
        );
    };

    const filteredStylists = selectedLocations.length
        ? stylists.filter((stylist) =>
              selectedLocations.includes(stylist.location)
          )
        : stylists;

    return (
        <BasePage>
            <Container>
                <GridContainer>
                    <Sidebar>
                        <SidebarHeader>
                            <Building2
                                style={{
                                    stroke: "#3b82f6",
                                    width: "1.25rem",
                                    height: "1.25rem",
                                }}
                            />
                            <span>Danh sách cửa hàng</span>
                        </SidebarHeader>
                        <CheckboxGroup>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    value="HCM"
                                    checked={selectedLocations.includes("HCM")}
                                    onChange={handleLocationChange}
                                />
                                <span>Thành Phố Hồ Chí Minh</span>
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    value="Hà Nội"
                                    checked={selectedLocations.includes(
                                        "Hà Nội"
                                    )}
                                    onChange={handleLocationChange}
                                />
                                <span>Thủ Đô Hà Nội</span>
                            </CheckboxLabel>
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    value="Đà Nẵng"
                                    checked={selectedLocations.includes(
                                        "Đà Nẵng"
                                    )}
                                    onChange={handleLocationChange}
                                />
                                <span>Thành Phố Đà Nẵng</span>
                            </CheckboxLabel>
                        </CheckboxGroup>
                    </Sidebar>

                    <StylistList>
                        {filteredStylists.map((stylist, index) => (
                            <StylistItem key={index}>
                                <Link to={`/stylist/${index + 1}`}>
                                    <img
                                        src={stylist.avatar}
                                        alt={stylist.name}
                                    />
                                </Link>
                                <StylistInfo>
                                    <StylistName>{stylist.name}</StylistName>
                                    <p className="font-semibold">
                                        Chuyên nghiệp
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <Rate
                                            allowHalf
                                            disabled
                                            value={stylist.rating}
                                        />
                                        <span>({stylist.rating})</span>
                                    </div>
                                    <div
                                        style={{ display: "flex", gap: "1rem" }}
                                    >
                                        <p
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <MapPin
                                                style={{
                                                    stroke: "#3b82f6",
                                                    width: "1.25rem",
                                                    height: "1.25rem",
                                                }}
                                            />
                                            {stylist.location}
                                        </p>
                                        <p
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <Building
                                                style={{
                                                    stroke: "#3b82f6",
                                                    width: "1.25rem",
                                                    height: "1.25rem",
                                                }}
                                                title="Building"
                                            />
                                            {stylist.experience}
                                        </p>
                                    </div>
                                    <StylistDescription>
                                        {stylist.description}
                                    </StylistDescription>
                                </StylistInfo>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <Receipt
                                            style={{
                                                stroke: "#3b82f6",
                                                width: "1.25rem",
                                                height: "1.25rem",
                                            }}
                                        />
                                        <PriceContainer>
                                            <span>Chỉ từ</span>
                                            <strong>{stylist.price}</strong>
                                        </PriceContainer>
                                    </div>
                                    <Link to="/stylist/1">
                                        <StyledButton>Đặt lịch</StyledButton>
                                    </Link>
                                </div>
                            </StylistItem>
                        ))}
                    </StylistList>
                </GridContainer>
            </Container>
        </BasePage>
    );
}

const Container = styled.div`
    width: 80%;
    margin: 3rem auto 10rem;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 25% 75%;
    gap: 1rem;
    margin-top: 2rem;
`;

const Sidebar = styled.div`
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SidebarHeader = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const CheckboxGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
        width: 1rem;
        height: 1rem;
    }
`;

const StylistList = styled.div`
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StylistItem = styled.div`
    display: grid;
    grid-template-columns: 15% 65% 20%;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
        border-bottom: none;
    }
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
`;

const StylistInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-right: 15%;
`;

const StylistName = styled.h2`
    color: #ef4444;
    font-weight: bold;
    font-size: 1.1rem;
    text-align: start;
`;

const StylistDescription = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;

    strong {
        font-weight: bold;
    }
`;

const StyledButton = styled.button`
    width: 100%;
    background-color: #ef4444;
    &:hover {
        background-color: #dc2626;
    }
`;
