"use client";

import { useEffect, useRef, useState } from "react";
import { Skill } from "../page";
import Modal from "../preset/Modal";

export default function Home() {
    const [skillModal, setSkillModal] = useState<Skill | null>(null)
    const [page, setPageStatus] = useState(0);
    const pageRef = useRef(page);
    const infoes = ['메인', '역할', '시스템 설계도', '자료 흐름도', '동작 방식', '소프트웨어 흐름도', 'DANN', 'DANN 내부 모델 선정', 'yolo']

    const delayInterval = useRef(null as any);
    const isDelay = useRef(false);



    useEffect(() => {
        const handelr = (e: KeyboardEvent) => {

            if (e.key == "ArrowUp" || e.key == "ArrowLeft")
                setPage(Math.max(0, pageRef.current - 1))
            else if (e.key == "ArrowDown" || e.key == "ArrowRight")
                setPage(Math.min(infoes.length - 1, pageRef.current + 1));
            else if (e.key == "Home" || e.key == "PageUp")
                setPage(0, true);
            else if (e.key == "End" || e.key == "PageDown")
                setPage(infoes.length - 1, true);
            else if (Number(e.key) > 0 && Number(e.key) <= infoes.length)
                setPage(Number(e.key) - 1, true);
        }
        window.addEventListener('keydown', handelr);

        return () => window.removeEventListener('keydown', handelr);
    }, [])
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
    }
    function Icon(props: Skill) {
        return <div key={props.name} className='group relative p-4 rounded-full flex items-center justify-center border-4 w-[10rem] h-[10rem] m-3 cursor-pointer' style={{ borderColor: props.color }} onClick={() => setSkillModal(props)}>
            <img src={props.url} alt={props.name} className='w-[9rem] h-[7.5rem]' />
            <div className='absolute -top-1 -left-1 rounded-full transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-60 w-[10rem] h-[10rem]' style={{ background: props.color + ' 10%' }}></div>
            <div className='absolute -top-1 -left-1 rounded-full z-[1] transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-100 flex items-center justify-center text-2xl text-white w-[10rem] h-[10rem] font-bold'>{props.name}</div>
            <img src='/click.png' alt='click' className='absolute -right-6 -bottom-6 w-[4rem] h-[4rem] transition-all ease-in-out duration-400 opacity-0 group-hover:opacity-50' />
        </div>
    }
    function Page() {
        switch (page) {
            case 0:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >객체 탐지를 활용한 지능형 범위-지원 표면 결함 검사</div>
                    <div className="flex w-full h-[70%] flex-col">
                        <div className="self-end text-xs">
                            2023-04 ~ 2023-11 (8개월)
                        </div>
                        <div className="w-full mb-6 flex flex-col items-center border-gray-300 border-4">
                            <label className="text-center text-2xl font-bold p-2">목표</label>
                            <div className="border-gray-300 border-t-4 w-full"></div>
                            <div className="p-4 text-xl">
                                표면 결함 검사에서 일반적으로 신뢰성을 보장하기 어려운 상황을 개선하고, 이미지 획득 환경의 변동이 검사 신뢰성에 영향을 미치지 않도록 보다 효율적이고 정확한 표면 결함 검사를 구현하는 것을 목표
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-[47.5%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">주요 기능</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full">
                                    <ul className="font-bold">탐지 기능</ul>
                                    <li>객체 탐지 (이미지 탐지, 이미지 종류 탐지)</li>
                                    <li>결함 탐지 (물체의 결함 탐지)</li>

                                    <ul className="font-bold mt-4">회원 기능</ul>
                                    <li>로그인, 회원가입</li>
                                    <li>기기 등록</li>

                                    <ul className="font-bold mt-4">모니터링</ul>
                                    <li>결함 데이터 확인(판독 수 비례 정상 및 결함 비율 확인)</li>
                                </div>
                            </div>
                            <div className="ml.auto w-[47.5%] flex flex-col items-center border-gray-300 border-4">
                                <label className="text-center text-2xl font-bold p-2">설계/프로세스</label>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 w-full flex flex-col">
                                    <li>팀원 구성 : 총 3명</li>
                                    <li>개발 환경 : Colab, Windows 10</li>
                                    <li>하드웨어 플랫폼 : Jetson Nano</li>
                                    <li>개발 도구 : Python Idle</li>
                                    <li>개발 언어 : Python</li>
                                    <li>인공지능 모델 : Yolov8, DANN</li>
                                    <li>프레임 워크 : Pytorch</li>
                                    <li>라이브러리 : OpenCV</li>
                                    <li>서버 환경 : Ubuntu 20.04 LTS</li>
                                    <li>DB : MariaDB</li>
                                    <li>웹 : express</li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            case 1:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >팀원구성 및 기술과 환경</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <div className="w-full mb-6 flex justify-evenly">
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/leader.png" alt="leader" className="w-[1.8rem] h-[1.8rem]" />홍성재(팀장)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>서버 환경 구축</li>
                                    <li>이미지 모델 구축</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />최민기(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>테스트 베드 구축</li>
                                    <li>송수신 프로토콜 구축</li>
                                </div>
                            </div>
                            <div className="border-gray-300 border-4">
                                <div className="text-center text-2xl font-bold p-2 flex justify-center items-center"><img src="/person.png" alt="person" className="w-[1.8rem] h-[1.8rem]" />김다현(팀원)</div>
                                <div className="border-gray-300 border-t-4 w-full"></div>
                                <div className="p-4 text-xl">
                                    <li>모니터링 시스템</li>
                                    <li>웹 구축</li>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex h-[70%] w-full flex-col">

                        <div className="border-gray-300 border-4 rounded-xl flex flex-wrap w-full h-[30rem] items-center">
                            <Icon name='Python' url='/python.png' color='#3771A1' description='1991년 네덜란드계 소프트웨어 엔지니어인 귀도 반 로섬이 발표한 고급 프로그래밍 언어로, 인터프리터를 사용하는 객체지향 언어이자 플랫폼에 독립적인, 동적 타이핑 대화형 언어이다.' has='인터프리터 방식을 이해하고 프로젝트 수행이 가능합니다' link='https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%B4%EC%8D%AC' />
                            <Icon name='Yolo' url='/yolo.png' color='#00A3DF' description='You look only once의 축약어로, 이미지를 한번만 보고 바로 물체를 검출하는 딥러닝 기술을 이용한 물체 검출 모델이다.' has='물체 클래스들을 지정하여 학습을 통하여 물체의 클래스를 분류할 수 있습니다.' />
                            <Icon name='DANN' url='/dann.png' color='#000000' description='Domain-Adversarial Training of Neural Networks의 축약어로, 소스 도메인과 타겟 도메인이 나누어 지정한 특징은 구별하나 그외 특징은 구별하지 못하게 만들어진 모델이다.' has='데이터를 통하여 학습 및 예측이 가능합니다.' />
                            <Icon name='Resnet' url='/resnet.png' color='#012563' description='스킵 연결을 통해 잔차를 학습하도록 만들어진 인공신경망이다. 일반적인 딥러닝 신경망 모델보다 예측 정확도가 높다.' has='데이터를 통하여 모델 학습과 예측이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9E%94%EC%B0%A8_%EC%8B%A0%EA%B2%BD%EB%A7%9D' />
                            <Icon name='Pytorch' url='/pytorch.png' color='#F15632' description='Python을 위한 오픈소스 머신 러닝 라이브러리로 Torch를 기반으로 하며, 자연어 처리와 같은 애플리케이션을 위해 사용된다. GPU사용이 가능하기 때문에 속도가 상당히 빠르다.' has='모델의 학습에 Pytorch 사용이 가능합니다.' link='https://ko.wikipedia.org/wiki/PyTorch' />
                            <Icon name='Ubuntu' url='/ubuntu.png' color='#DE4814' description='영국 기업 캐노니컬이 개발, 배포하는 컴퓨터 운영 체제이다. 데비안 리눅스를 기반으로 개발되며, 데비안에 비해 사용자 편의성에 초점을 맞춘 리눅스 배포판이다.' has='배포를 위한 환경 구축이 가능합니다.' link='https://ko.wikipedia.org/wiki/%EC%9A%B0%EB%B6%84%ED%88%AC' />
                            <Icon name='OpenCV' url='/opencv.png' color='#8BDA67' description='실시간 컴퓨터 비전을 목적으로 한 프로그래밍 라이브러리이다.' has='지원하는 카메라 모듈과 연동하여 사용할 수 있습니다.' link='https://ko.wikipedia.org/wiki/OpenCV' />
                            <Icon name='MariaDB' url='/mariadb.png' color='#32427A' description='오픈 소스의 관계형 데이터베이스 관리 시스템이다. MySQL과 동일한 소스 코드를 기반으로 한다.' link='https://ko.wikipedia.org/wiki/MariaDB' />
                            <Icon name='NodeJS' url='/nodejs.png' color='#41893e' description='크로스플랫폼 오픈소스 자바스크립트 런타임 환경으로 윈도우, 리눅스, macOS 등을 지원한다.' has='형상관리를 위한 활용이 가능합니다.' link='https://ko.wikipedia.org/wiki/Node.js' />
                            <Icon name='HTML' url='/html.png' color='#D44D26' description='하이퍼 텍스트 마크업 언어는 웹 페이지 표시를 위해 개발된 지배적인 마크업 언어이다.' has='HTML 태그와 선택자를 활용한 웹 디자인이 가능합니다.' link='https://ko.wikipedia.org/wiki/HTML' />
                            <Icon name='CSS' url='/css.png' color='#264DE4' description='종속형 시트 또는 캐스케이딩 스타일 시트는 마크업 언어가 실제 표시되는 방법을 기술하는 스타일 언어이다.' has='CSS를 활용한 웹 디자인이 가능합니다.' link='https://ko.wikipedia.org/wiki/CSS' />
                        </div>

                    </div>
                </div>
            case 2:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >시스템 설계도</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <img src="/system.png" alt="system" />
                    </div>
                </div>
            case 3:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >자료 흐름도</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <img src="/flow.png" alt="flow" />
                    </div>
                </div>
            case 4:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >동작 방식</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <img src="/action.png" alt="action" />
                    </div>
                </div>
            case 5:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >소프트웨어 흐름도</div>
                    <div className="flex h-[70%] w-full flex-col">
                        <img src="/software.png" alt="software" />
                    </div>
                </div>
            case 6:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >DANN란?</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/dann structure.png" className="cursor-pointer peer" alt="software" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold">Domain-Adversarial Training of Neural Networks</label>
                            <label>라벨 분류기가 제 역할을 유지하면서 특징 표현이 소스 도메인에서 왔는지 타겟 도메인에서 왔는지 구별할 수 없도록 도메인 구별을 약화시켜 학습시키는 방법</label>
                            <label>결함을 찾는 라벨 분류기는 결함에대한 라벨(정상, 불량)에 대한 결과값을 도출</label>
                            <label>특징을 완화 시킨 클래스 분류기는 해당 결함이 밝기나 재질 등이 다르더라도 분류할 수 있게 조정</label>

                        </div>
                    </div>
                </div>
            case 7:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >이미지 분류기 모델 선정표</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/acc.png" alt="acc" className="cursor-pointer peer" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center font-bold text-xl mt-2">특징</label>
                            <label>DANN은 이미지 분류기를 선택할 수 있으며 이미지 분류기는 각 이미지를 학습하여 클래스와 도메인을 분류하는데 사용됩니다.</label>
                            <label className="self-center font-bold text-xl mt-2">모델 설명</label>
                            <label><label className="font-bold">CNN</label>은 데이터로부터 직접 학습하는 딥러닝 신경망 아키텍처 모델</label>
                            <label><label className="font-bold">Resnet</label>CNN에서 개량한 것으로 Layer를 쌓다가 발생하는 가중치에 따른 결과값이 0이되버리는 기울기 소멸문제를 해결한 모델</label>
                            <label><label className="font-bold">MemAE</label>는 이상치 탐지의 한계를 개선하기위해 메모리 모듈를 사용해 추가적인 학습없이도 가중치를 변경해가는 모델</label>
                            <label className="self-center font-bold text-xl mt-2">배경 설명</label>
                            <label>파란 막대는 소스 데이터, 빨간 막대는 타겟 데이터셋으로, 불량 혹은 정상 물체의 이미지가 들어가있습니다.</label>
                        </div>
                    </div>
                </div>
            case 8:
                return <div key={page} className="w-[60%] flex flex-col items-center relative">
                    <div className="w-[55rem] border-b-4 mx-auto border-[#DDB71D] mb-16 text-[#DDB71D] text-4xl flex items-center justify-center py-4" >YOLO (You Look Only Once)</div>
                    <div className="flex h-[70%] w-full flex-col relative">
                        <img src="/yolo_test.png" className="cursor-pointer peer" alt="software" />
                        <div className="absolute w-full -translate-y-1/2 top-[50%] -translate-x-1/2 left-[50%] hover:opacity-100 peer-hover:opacity-100 opacity-0 bg-white p-4 flex justify-center flex flex-col border-2 rounded-lg">
                            <label className="self-center text-xl font-bold mt-2">yolo 사용 이유</label>
                            <label>움직이는 레일 위에서 물체 찾고 해당 물체의 위치를 특정하여 물체의 이미지 데이터를 확보하기 위해 사용했습니다.</label>
                            <label className="self-center text-xl font-bold mt-2">V8 선택 이유</label>
                            <label>레일 위에서 측정을 하기위해서는 빠르고 가벼운 모델이 필요했으며, 그 중에서도 가장 정확도가 높아야했습니다.</label>
                            <label>목적에 가장 적합한 버전은 V8으로 판단하여 YoloV8을 선정했습니다.</label>
                        </div>
                    </div>
                </div>
            default:
                return <></>
        }
    }


    return <main className="w-screen h-screen flex flex-col items-center justify-center relative" onWheel={e => {
        if (e.deltaY > 0)
            setPage(Math.min(infoes.length - 1, page + 1));
        else if (e.deltaY < 0)
            setPage(Math.max(0, page - 1))

    }}>
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Page key={"page"} />
            <Modal open={skillModal != null} onClose={() => setSkillModal(null)} escClose={true} outlineClose={true} className='rounded-2xl'>
                <div className='w-[40rem] h-[20rem] flex items-center'>

                    <img src={skillModal?.url} alt={skillModal?.name} className='w-[15rem] h-[15rem] m-4' />

                    <div className='divider divider-horizontal mx-0' />
                    <div className='flex flex-col h-full w-full'>
                        <div className={'w-full p-4 flex flex-col justify-between' + (skillModal?.has ? ' border-b-2' : '')} style={{ height: skillModal?.has ? '50%' : '100%' }}>
                            <label>{skillModal?.description}</label>
                            {skillModal?.link ?
                                <a className='self-end hover:underline' href={skillModal?.link} onMouseEnter={e => (e.target as HTMLElement).style.color = skillModal?.color as string} onMouseLeave={e => (e.target as HTMLElement).style.color = ''}>위키백과</a>
                                : <></>}
                        </div>
                        {skillModal?.has ? <div className='h-[50%] w-full p-4 font-bold'>{skillModal?.has}</div> : <></>}
                    </div>
                </div>
            </Modal>
        </div>
        <div className="absolute right-10 flex flex-col">
            {infoes.map((info, index) => <button key={index} className="group relative flex items-center outline-none" onClick={() => setPage(index, true)}>
                <div className="group-hover:block hidden absolute right-5 flex items-center z-[1] bg-white rounded-lg p-1" style={{ width: info.length + ".5rem" }}>{info}</div>
                {index == page ? '●' : '○'}
            </button>)}
        </div>

    </main>
}