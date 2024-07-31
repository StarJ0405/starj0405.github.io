"use client";


import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(0);
  const [tick, setTick] = useState(null as any);
  const infoes = ['메인', '프로필', '스킬', '포트폴리오', '연락처']
  const [randColor, setRandColor] = useState('#000000');
  function numberToHex(number: number) {

    switch (number) {
      case 15:
        return 'f';
      case 14:
        return 'e';
      case 13:
        return 'd';
      case 12:
        return 'c';
      case 11:
        return 'b';
      case 10:
        return 'a';
      default:
        return number;

    }
  }
  function Icon(props: { url: string, name: string, color: string }) {
    return <div className="group relative p-4 rounded-full border-4 w-[10rem] h-[10rem] m-4" style={{ borderColor: props.color }}>
      <img src={props.url} alt={props.name} className="w-[7.5rem] h-[7.5rem]" />
      <div className="absolute -top-1 -left-1 rounded-full transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-60 w-[10rem] h-[10rem]" style={{ background: props.color + " 10%" }}></div>
      <div className="absolute -top-1 -left-1 rounded-full z-[1] transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-100 flex items-center justify-center text-2xl text-white w-[10rem] h-[10rem] font-bold">{props.name}</div>
    </div>
  }
  function Page() {
    switch (page) {
      case 0: return <>
        <img src="/portfolio.png" className="w-[60%] border-[#DDB71D]" alt="logo" />
        <div className="absolute bottom-6 flex flex-col items-center">
          <img alt="스크롤" src="/scroll.png" className="w-[4.5rem] h-[4.5rem]" />
          <label className="transition-all duration-500 ease-in-out" style={{ color: randColor }}>Scroll Down</label>
        </div>
      </>
      case 1: return <div className="w-[80%] h-[90%]">
        <img src="/profile.png" alt="profile" className="border-b-4 mx-auto border-[#DD1D4F]" style={{ height: '15%' }} />
        <div className="border-2 w-full h-[80%] mt-4 flex bg-gray-700 border-4 rounded-2xl p-4">
          <div className="rounded-full p-4 flex items-center justify-center w-[25rem]">
            <img src="/pi.jpg" className="rounded-full w-[12.5rem]" alt="프로필 이미지" />
          </div>
          <div className="divider divider-warning divider-horizontal my-auto h-[70%] w-[1.25rem]"></div>
          <div className="flex flex-col text-white p-4">
            <label className="text-2xl font-bold my-4">이름</label>
            <label className="text-lg">- 홍성재</label>
            <label className="text-2xl font-bold my-4">자격증</label>
            <label className="text-lg">- 정보처리 기사 | 2024.06</label>
            <label className="text-lg">- SQL 개발자 | 2024.06</label>
            <label className="text-lg">- 리눅스 마스터 2급 | 2024.06</label>
            <label className="text-lg">- 워드프로세서 2급 | 2010.06</label>
            <label className="text-lg">- ITQ 한글엑셀 B등급 | 2009.12</label>
            <label className="text-lg">- ITQ 아래한글 B등급 | 2007.12</label>
            <label className="text-lg">- ITQ 한글파워포인트 B등급 | 2007.10</label>
            <label className="text-2xl font-bold my-4">학력</label>
            <label className="text-lg">- 전남 대학교 여수캠퍼스 | 2017.03 - 2024.02</label>
            <label className="text-2xl font-bold my-4">교육 과정</label>
            <label className="text-lg">- 코리아 IT 아카데미 웹 개발자 수료 | 2024.02 - 2024.08</label>
          </div>
        </div>
      </div>
      case 2:
        return <div className="w-[80%] h-[90%]">
          <img src="/skill.png" alt="profile" className="border-b-4 mx-auto border-[#51C9E0]" style={{ height: '15%' }} />
          <div className="flex flex-wrap px-4">
            <Icon name="HTML" url="/html.png" color="#D44D26" />
            <Icon name="CSS" url="/css.png" color="#264DE4" />
            <Icon name="JavaScript" url="/js.png" color="#E7A42B" />
            <Icon name="Java" url="/java.png" color="#F8582A" />
            <Icon name="Python" url="/python.png" color="#3771A1" />
            <Icon name="Next.js" url="/nextjs.png" color="#000000" />
            <Icon name="Spring Boot" url="/springboot.png" color="#6CB33E" />
            <Icon name="MySQL" url="/mysql.png" color="#00818a" />
            <Icon name="Docker" url="/docker.png" color="#129fdb" />
            <Icon name="기계학습" url="/machine_learning.png" color="#ff94d5" />
            <Icon name="Git" url="/git.png" color="#f05033" />
            <Icon name="NodeJS" url="/nodejs.png" color="#41893e" />
            <Icon name="Linux" url="/linux.png" color="#060606" />
            
            
          </div>
        </div>
      default:
        return <></>
    }
  }
  function randColorChange() {
    const r = Math.random() * 256 % 256;
    const g = Math.random() * 256 % 256;
    const b = Math.random() * 256 % 256;

    setRandColor('#' + numberToHex(Math.floor(r / 16)) + numberToHex(Math.floor(r % 16)) + numberToHex(Math.floor(g / 16)) + numberToHex(Math.floor(g % 16)) + numberToHex(Math.floor(b / 16)) + numberToHex(Math.floor(b % 16)))
  }
  useEffect(() => {
    if (page == 0) {
      randColorChange();
      const interval = setInterval(() => randColorChange(), 1000);
      setTick(interval);
      return () => clearInterval(interval);
    } else {
      if (tick)
        clearInterval(tick);
      return;
    }
  }, [page])
  return <main className="w-screen h-screen flex flex-col items-center justify-center relative" onWheel={e => {
    if (e.deltaY > 0)
      setPage(Math.min(infoes.length - 1, page + 1));
    else if (e.deltaY < 0)
      setPage(Math.max(0, page - 1))
  }}>
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Page />
    </div>
    <div className="absolute right-10 flex flex-col">
      {infoes.map((info, index) => <button key={index} className="group relative flex items-center outline-none" onClick={() => setPage(index)}>
        <div className="group-hover:block hidden absolute right-5 flex items-center z-[1] bg-white rounded-lg p-1" style={{ width: info.length + ".5rem" }}>{info}</div>
        {index == page ? '●' : '○'}
      </button>)}
    </div>

  </main>
}