import React, { useState, useEffect } from 'react';
import './Test.css'; // 스타일 파일을 따로 생성하여 스타일링

const Test = () => {
  const [seats, setSeats] = useState([]); // 좌석 정보를 담는 상태
  const [selectedSeats, setSelectedSeats] = useState([]); // 선택한 좌석 정보

  const generateSeats = () => {
    const seatCount = 30;
    const newSeats = [];

    for (let i = 1; i <= seatCount; i++) {
      const isReserved = Math.random() < 0.2;
      newSeats.push({
        id: i,
        isReserved,
        isSelected: false,
      });
    }

    setSeats(newSeats);
  };

  const handleSeatSelection = (seat) => {
    if (!seat.isReserved) {
      if (selectedSeats.length < 2) {
        const index = selectedSeats.findIndex((selectedSeat) => selectedSeat.id === seat.id);

        if (index !== -1) {
          // 이미 선택된 좌석을 다시 클릭하면 선택 해제
          setSelectedSeats([]);
        } else {
          // 새로운 좌석을 클릭하면 오른쪽 좌석도 함께 선택
          const rightSeat = seats.find((s) => s.id === seat.id + 1);
          if (rightSeat && !rightSeat.isReserved) {
            setSelectedSeats([seat, rightSeat]);
          } else {
            setSelectedSeats([seat]);
          }
        }
      } else {
        alert('최대 2개까지 선택 가능합니다.');
      }
    } else {
      alert('이미 예약된 좌석입니다.');
    }
  };

  useEffect(() => {
    generateSeats();
  }, []);

  return (
    <div className="seat-reservation-system">
      <h2>좌석 예약 시스템</h2>
      <div className="seats-container">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.isReserved ? 'res' : ''} ${
              selectedSeats.some((selectedSeat) => selectedSeat.id === seat.id)
                ? 'selected'
                : ''
            }`}
            onClick={() => {
              if (selectedSeats.length < 2) {
                handleSeatSelection(seat);
              } else if (selectedSeats.length === 2 && selectedSeats.some((selectedSeat) => selectedSeat.id === seat.id)) {
                // 이미 선택된 좌석을 다시 클릭하면 해제
                const updatedSelectedSeats = selectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id);
                setSelectedSeats(updatedSelectedSeats);
              }
            }}
          >
            {seat.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
