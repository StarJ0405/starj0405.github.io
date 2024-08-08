'use client';


import { useEffect, useRef, useState } from 'react';
import Modal from './preset/Modal';

export interface Skill {
  url: string, name: string, color: string, description?: string, has?: string, link?: string
}
interface Message {
  message: string, life: number;
}
interface Portfolio {
  name: string,
  image: string,
  git?: string,
  io?: string,
  page?: string,
}
export default function Home() {
  const [page, setPageStatus] = useState(0);
  const pageRef = useRef(page);
  const [tick, setTick] = useState(null as any);
  const infoes = ['메인', '프로필', '스킬', '포트폴리오', '연락처']
  const [randColor, setRandColor] = useState('#000000');
  const [skillModal, setSkillModal] = useState<Skill | null>(null)
  const delayInterval = useRef(null as any);
  const isDelay = useRef(false);
  const [messages, setMessageStatus] = useState<Message[]>([]);
  const messageRef = useRef(messages);
  const [messageInterval, setMessageInterval] = useState(null as any);
  const [auto, setAuto] = useState(true);
  const [portfolioPage, setPortfolioPageStatus] = useState(0);
  const portfolioPageRef = useRef(portfolioPage);
  const autoRef = useRef<HTMLDivElement | null>(null);
  const autoTickRef = useRef(0);
  const maxAutoTick = 250;
  const portfolioes = [
    { name: '객체 탐지를 활용한 지능형 범위-지원 표면 결함 검사', image: '/real_DANN.png', io: '/dann' },
    { name: '레시피 공유 플랫폼 (Food Recipe)', image: '/food.png', io:'/food',git:'https://github.com/StarJ0405/FoodRecipeWeb' , page: 'http://server.starj.kro.kr:18180' },
    { name: '소셜 네트워크 서비스 사이트 (Social)', image: '/social.png', io:'/social', git:'https://github.com/StarJ0405/Social', page: 'http://server.starj.kro.kr:13102' },
    { name: '전자상거래 소매 중개업 사이트 (ShoppingMall)', image: '/shopping.png',io:'/shopping',git:'https://github.com/StarJ0405/ShoppingMall', page: 'http://server.starj.kro.kr:13104' },
    { name: '회사 커뮤니케이션 및 협업 도구 (HoneyBadger)', image: '/honeybadger.png',io:'/honeybadger' ,git:'https://github.com/StarJ0405/HoneyBadger', page: 'http://server.starj.kro.kr:13106' }
  ] as Portfolio[];


  useEffect(() => {
    if (auto && pageRef.current == 3 && autoRef.current) {
      autoTickRef.current = 0;
      const interval = setInterval(() => {
        if (pageRef.current != 3 || !auto) {
          clearInterval(interval);
          return;
        }
        autoTickRef.current = autoTickRef.current + 1;
        if (autoTickRef.current > maxAutoTick) {
          autoTickRef.current = -100;
          setPortfolioPage(portfolioPageRef.current + 1);
        }

        if (autoRef.current) {
          if (autoTickRef.current > 0)
            autoRef.current.style.backgroundImage = 'linear-gradient(to right,lime ' + Math.floor((autoTickRef.current / maxAutoTick) * 100) + '%, white ' + Math.floor((autoTickRef.current / maxAutoTick) * 100) + '% 100%)';
          else
            autoRef.current.style.backgroundImage = 'linear-gradient(to right,lime 0%, white 0% 100%)';
        } else {
          clearInterval(interval);
          return;
        }
      }, 20);
      return () => clearInterval(interval);
      // style={{ backgroundImage: 'linear-gradient(to right,green, white ' + ('0%') + ')' }}

    }
  }, [page, auto])
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

  useEffect(() => {
    const handelr = (e: KeyboardEvent) => {

      if (e.key == 'ArrowUp' || e.key == 'ArrowLeft')
        setPage(Math.max(0, pageRef.current - 1))
      else if (e.key == 'ArrowDown' || e.key == 'ArrowRight')
        setPage(Math.min(infoes.length - 1, pageRef.current + 1));
      else if (e.key == 'Home' || e.key == 'PageUp')
        setPage(0, true);
      else if (e.key == 'End' || e.key == 'PageDown')
        setPage(infoes.length - 1, true);
      else if (Number(e.key) > 0 && Number(e.key) <= infoes.length)
        setPage(Number(e.key) - 1, true);
    }
    window.addEventListener('keydown', handelr);

    return () => window.removeEventListener('keydown', handelr);
  }, [])
  useEffect(() => {
    if (messageRef.current.length > 0) {
      const interval = setInterval(() => {
        const pre = messageRef.current.length;
        if (pre == 0) {
          clearInterval(interval);
          return;
        }
        const result = messageRef.current.filter(f => f.life >= new Date().getTime());
        if (pre != result.length)
          setMessage(result)
      }, 100);
      setMessageInterval(interval);
      return () => clearInterval(interval);
    } else if (messageInterval)
      clearInterval(messageInterval);
  }, [messages])
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
  function setPortfolioPage(page: number) {
    if (page < 0)
      page = portfolioes.length + page % portfolioes.length;
    else if (page > 0)
      page = page % portfolioes.length;
    portfolioPageRef.current = page;
    setPortfolioPageStatus(portfolioPageRef.current);
  }
  function setPage(page: number, force?: boolean) {
    if (force) {
      if (delayInterval.current)
        clearInterval(delayInterval.current);
      isDelay.current = false;
    }
    if (isDelay.current)
      return;
    setPageStatus(page);
    pageRef.current = page;
    isDelay.current = true;
    const interval = setInterval(() => { isDelay.current = false; clearInterval(interval) }, 100);
    delayInterval.current = interval;
    if (messageInterval)
      clearInterval(messageInterval);
    setMessage([]);
  }
  function Icon(props: Skill) {
    return <div key={props.name} className='group relative p-4 rounded-full flex items-center justify-center border-4 w-[12.5rem] h-[12.5rem] m-4 cursor-pointer' style={{ borderColor: props.color }} onClick={() => setSkillModal(props)}>
      <img src={props.url} alt={props.name} className='w-[11.25rem] h-[9.375rem]' />
      <div className='absolute -top-1 -left-1 rounded-full transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-60 w-[12.5rem] h-[12.5rem]' style={{ background: props.color + ' 10%' }}></div>
      <div className='absolute -top-1 -left-1 rounded-full z-[1] transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-100 flex items-center justify-center text-2xl text-white w-[12.5rem] h-[12.5rem] font-bold'>{props.name}</div>
      <img src='/click.png' alt='click' className='absolute -right-8 -bottom-8 w-[6rem] h-[6rem] transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-50' />
    </div>
  }
  function copy(cliboard: string, message: string) {
    navigator.clipboard.writeText(cliboard);
    addMessage(message);
  }
  function addMessage(message: string) {
    const newMessage = { message: message, life: new Date().getTime() + 1 * 1000 } as Message;
    setMessage([newMessage, ...messageRef.current]);
  }
  function setMessage(messages: Message[]) {
    messageRef.current = messages;
    setMessageStatus(messageRef.current);
  }
  function Portfolio(data: { portfolio: Portfolio }) {
    const portfolio = data.portfolio;
    return <div className='w-full h-full flex flex-col items-center relative'>
      <div className='z-[1] w-full text-center bg-white text-black absolute top-0 bg-opacity-80 text-2xl font-bold py-2'>{portfolio.name}</div>
      <img className='h-full bg-white' src={portfolio.image} />
      <div className='absolute bottom-4 right-2'>
        {portfolio?.git ? <button className='mr-1 p-2 bg-white rounded-full hover:opacity-60' onClick={() => window.open(portfolio.git)}><img src={'/github.png'} alt='github' className='w-[2rem] h-[2rem]' /></button> : <></>}
        {portfolio.io ? <button className='mr-1 p-2 bg-white rounded-full hover:opacity-60' onClick={() => window.open(portfolio.io)}><img src={'/io.png'} alt='io' className='w-[2rem] h-[2rem]' /></button> : <></>}
        {portfolio.page ? <button className='mr-1 p-2 bg-white rounded-full hover:opacity-60' onClick={() => window.open(portfolio.page)}><img src={'/link.png'} alt='link' className='w-[2rem] h-[2rem]' /></button> : <></>}
      </div>
    </div>;
  }
  function Page() {
    switch (page) {
      case 0: return <>
        <img src='/logo.png' className='w-[60%] border-[#DDB71D]' alt='logo' />
        <div className='absolute bottom-6 flex flex-col items-center'>
          <img alt='스크롤' src='/scroll.png' className='w-[4.5rem] h-[4.5rem]' />
          <label className='transition-all duration-500 ease-in-out' style={{ color: randColor }}>Scroll Down</label>
        </div>
      </>
      case 1: return <div key={page} className='w-[80%] h-[90%]'>
        <img src='/profile.png' alt='profile' className='border-b-4 mx-auto border-[#DD1D4F]' style={{ height: '15%' }} />
        <div className='border-2 w-full h-[80%] mt-4 flex bg-gray-700 border-4 rounded-2xl p-4'>
          <div className='rounded-full p-4 flex items-center justify-center w-[25rem]'>
            <img src='/pi.jpg' className='rounded-full w-[12.5rem]' alt='프로필 이미지' />
          </div>
          <div className='divider divider-warning divider-horizontal my-auto h-[70%] w-[1.25rem]'></div>
          <div className='flex flex-col text-white p-4'>
            <label className='text-2xl font-bold my-4'>이름</label>
            <label className='text-lg'>- 홍성재</label>
            <label className='text-2xl font-bold my-4'>자격증</label>
            <label className='text-lg'>- 정보처리 기사 | 2024.06</label>
            <label className='text-lg'>- SQL 개발자 | 2024.06</label>
            <label className='text-lg'>- 리눅스 마스터 2급 | 2024.06</label>
            <label className='text-lg'>- 워드프로세서 2급 | 2010.06</label>
            <label className='text-lg'>- ITQ 한글엑셀 B등급 | 2009.12</label>
            <label className='text-lg'>- ITQ 아래한글 B등급 | 2007.12</label>
            <label className='text-lg'>- ITQ 한글파워포인트 B등급 | 2007.10</label>
            <label className='text-2xl font-bold my-4'>학력</label>
            <label className='text-lg'>- 전남 대학교 여수캠퍼스 | 2017.03 - 2024.02</label>
            <label className='text-2xl font-bold my-4'>교육 과정</label>
            <label className='text-lg'>- 코리아 IT 아카데미 웹 개발자 수료 | 2024.02 - 2024.08</label>
          </div>
        </div>
      </div>
      case 2:
        return <div key={page} className='w-[80%] h-[90%] relative'>
          <img src='/skill.png' alt='skill' className='border-b-4 mx-auto border-[#51C9E0]' style={{ height: '15%' }} />
          <div className='flex flex-wrap px-4 py-8'>
            <Icon name='HTML' url='/html.png' color='#D44D26' description='하이퍼 텍스트 마크업 언어는 웹 페이지 표시를 위해 개발된 지배적인 마크업 언어이다.' has='HTML 태그와 선택자를 활용한 웹 디자인이 가능합니다.' link='https://ko.wikipedia.org/wiki/HTML' />
            <Icon name='CSS' url='/css.png' color='#264DE4' description='종속형 시트 또는 캐스케이딩 스타일 시트는 마크업 언어가 실제 표시되는 방법을 기술하는 스타일 언어이다.' has='CSS를 활용한 웹 디자인이 가능합니다.' link='https://ko.wikipedia.org/wiki/CSS' />
            <Icon name='JavaScript' url='/js.png' color='#E7A42B' description='객체 기반의 스크립트 프로그래밍 언어이다. 이 언어는 웹 브라우저 내에서 주로 사용된다.' has='DOM 문법을 이해하고 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8' />
            <Icon name='Java' url='/java.png' color='#F8582A' description='썬 마이크로시스템즈의 제임스 고슬링(James Gosling)과 다른 연구원들이 개발한 객체 지향적 프로그래밍 언어이다.' has='객체지향 구조를 이해하고 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4)' />
            <Icon name='Python' url='/python.png' color='#3771A1' description='1991년 네덜란드계 소프트웨어 엔지니어인 귀도 반 로섬이 발표한 고급 프로그래밍 언어로, 인터프리터를 사용하는 객체지향 언어이자 플랫폼에 독립적인, 동적 타이핑 대화형 언어이다.' has='인터프리터 방식을 이해하고 프로젝트 수행이 가능합니다' link='https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%B4%EC%8D%AC' />
            <Icon name='Next.js' url='/nextjs.png' color='#000000' description='서버 사이드 렌더링, 정적 웹 페이지 생성 등 리액트 기반 웹 애플리케이션 기능들을 가능케 하는 Node.js 위에서 빌드된 오픈 소스 웹 개발 프레임워크이다.' has='SSR과 CSR을 활용하여 페이지 구성이 가능합니다.' link='https://ko.wikipedia.org/wiki/Next.js' />
            <Icon name='Spring Boot' url='/springboot.png' color='#6CB33E' description='최소한의 노력으로 독립 실행형 프로덕션 등급 Spring 기반 애플리케이션을 프로그래밍하는 데 사용되는 오픈 소스 Java 프레임워크이다.' has='JPA와 QueryDSL 및 RestAPI 구성이 가능합니다.' link='https://en.wikipedia.org/wiki/Spring_Boot' />
            <Icon name='MySQL' url='/mysql.png' color='#00818a' description='세계에서 가장 많이 쓰이는 오픈 소스의 관계형 데이터베이스 관리 시스템으로 다중 스레드, 다중 사용자, 구조질의어 형식의 데이터베이스 관리 시스템으로 오라클이 관리 및 지원하고 있다.' has='ERD작성과 CRUD 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/MySQL' />
            <Icon name='Docker' url='/docker.png' color='#129fdb' description='리눅스의 응용 프로그램들을 프로세스 격리 기술들을 사용해 컨테이너로 실행하고 관리하는 오픈 소스 프로젝트이다.' has='Github Action을 이용한 무중단 배포 환경 구축이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EB%8F%84%EC%BB%A4_(%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4)' />
            <Icon name='기계학습' url='/machine_learning.png' color='#ff94d5' description='컴퓨터 시스템이 패턴과 추론에 의존하여 명시적 지시 없이 태스크를 수행하는 데 사용하는 알고리즘과 통계 모델을 개발하는 과학이다.' has='핵심 모델을 활용한 이미지처리와 추천 시스템 구현이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EA%B8%B0%EA%B3%84_%ED%95%99%EC%8A%B5' />
            <Icon name='Git' url='/git.png' color='#f05033' description='컴퓨터 파일의 변경사항을 추적하고 여러 명의 사용자들 간에 해당 파일들의 작업을 조율하기 위한 스냅샷 스트림 기반의 분산 버전 관리 시스템이다.' has='Github Action과 협업을 위한 PR 사용이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EA%B9%83_(%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4)' />
            <Icon name='NodeJS' url='/nodejs.png' color='#41893e' description='크로스플랫폼 오픈소스 자바스크립트 런타임 환경으로 윈도우, 리눅스, macOS 등을 지원한다.' has='형상관리를 위한 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/Node.js' />
            <Icon name='Ubuntu' url='/ubuntu.png' color='#DE4814' description='영국 기업 캐노니컬이 개발, 배포하는 컴퓨터 운영 체제이다. 데비안 리눅스를 기반으로 개발되며, 데비안에 비해 사용자 편의성에 초점을 맞춘 리눅스 배포판이다.' has='배포를 위한 환경 구축이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9A%B0%EB%B6%84%ED%88%AC' />
            {/* <Icon name='Linux' url='/linux.png' color='#060606' description='무료 오픈 소스 운영체제로, 운영 체제 커널을 리눅스 커널이라고 하며 유닉스 계열 운영 체제이다.' has='배포를 위한 환경 구축이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4' /> */}
          </div>
        </div>
      case 3:
        return <div key={page} className='w-[60%] h-[90%] relative'>
          <img src='/portfolio.png' alt='portfolio' className='border-b-4 mx-auto border-[#DDB71D] mb-8' style={{ height: '15%' }} />
          <div className='flex bg-gray-600 border-8 h-[70%] relative' onMouseEnter={() => autoTickRef.current = -20}>
            <Portfolio portfolio={portfolioes[portfolioPageRef.current]} />
            <img src='/pre.png' className='w-[5rem] h-[5rem] absolute left-5 top-[50%] cursor-pointer hover:opacity-70' onClick={() => setPortfolioPage(portfolioPage - 1)} />
            <img src='/next.png' className='w-[5rem] h-[5rem] absolute right-5 top-[50%] cursor-pointer hover:opacity-70' onClick={() => setPortfolioPage(portfolioPage + 1)} />

            <button className={'absolute p-2 bg-white rounded-full left-2 ml-1 bottom-4' + (auto ? '' : ' hidden')} onClick={() => setAuto(false)} >
              <img src='/auto.png' className='w-[2rem] h-[2rem]' />
            </button>
            <button className={'absolute p-2 bg-white rounded-full left-2 ml-1 bottom-4' + (auto ? ' hidden' : '')} onClick={() => setAuto(true)} >
              <img src='/stop.png' className='w-[2rem] h-[2rem]' />
            </button>
            <div ref={autoRef} className='absolute bg-white py-2 px-4 border font-bold bottom-2 left-[50%]'>{`${portfolioPage + 1} / ${portfolioes.length}`}</div>
          </div>
        </div>
      case 4:
        return <div key={page} className='w-[40%] h-[50%] relative'>
          <img src='/contact.png' alt='contact' className='border-b-4 mx-auto border-[#8b572a]' style={{ height: '15%' }} />
          <div className='flex px-4 py-8 mt-8 justify-between'>
            <div className='w-[20rem] group cursor-pointer' onClick={() => copy('ghdtjdwo126@gmail.com', '이메일 주소가 복사되었습니다.')}>
              <div className='w-full text-white bg-[#8b572a] px-4 py-2 text-2xl'>E-MAIL</div>
              <div className='w-full text-[#8b572a] bg-gray-300 px-4 py-2 text-xl group-hover:underline group-hover:font-bold'>ghdtjdwo126@gmail.com</div>
            </div>
            <div className='w-[20rem] group cursor-pointer' onClick={() => copy('010-5534-4735', '전화번호가 복사되었습니다.')}>
              <div className='w-full text-white bg-[#8b572a] px-4 py-2 text-2xl'>PHONE</div>
              <div className='w-full text-[#8b572a] bg-gray-300 px-4 py-2 text-xl group-hover:underline group-hover:font-bold'>010-5534-4735</div>
            </div>
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

  return <main className='w-screen h-screen flex flex-col items-center justify-center relative' onWheel={e => {
    if (e.deltaY > 0)
      setPage(Math.min(infoes.length - 1, page + 1));
    else if (e.deltaY < 0)
      setPage(Math.max(0, page - 1))

  }}>
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Page key={'page'} />
      <Modal open={skillModal != null} onClose={() => setSkillModal(null)} escClose={true} outlineClose={true} className='rounded-2xl'>
        <div className='w-[40rem] h-[20rem] flex items-center'>

          <img src={skillModal?.url} alt={skillModal?.name} className='w-[15rem] h-[15rem] m-4' />

          <div className='divider divider-horizontal mx-0' />
          <div className='flex flex-col h-full w-full'>
            <div className='h-[50%] w-full border-b-2 p-4 flex flex-col justify-between'>
              <label>{skillModal?.description}</label>
              <a className='self-end hover:underline' href={skillModal?.link} onMouseEnter={e => (e.target as HTMLElement).style.color = skillModal?.color as string
              } onMouseLeave={e => (e.target as HTMLElement).style.color = ''}>위키백과</a>
            </div>
            <div className='h-[50%] w-full p-4 font-bold'>{skillModal?.has}</div>
          </div>
        </div>
      </Modal>
    </div>
    <div className='absolute right-10 flex flex-col'>
      {infoes.map((info, index) => <button key={index} className='group relative flex items-center outline-none' onClick={() => setPage(index, true)}>
        <div className='group-hover:block hidden absolute right-5 flex items-center z-[1] bg-white rounded-lg p-1' style={{ width: info.length + '.5rem' }}>{info}</div>
        {index == page ? '●' : '○'}
      </button>)}
    </div>
    <div className='absolute right-[3.5rem] bottom-10 flex flex-col'>
      {messages.map((message, index) => <div className='border-2 rounded-lg p-2 my-2' key={index}>{message.message}</div>)}
    </div>
  </main>
}