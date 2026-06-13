import { Topic, Problem } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'info-basics',
    title: '情報基礎',
    subtitle: '全商/CBT方式',
    badge: '１年生向け',
    level: '基礎',
    description: '1級獲得には必ず取得が必要な検定です。令和8年度からの新科目。AIの利活用、データの収集・分析、情報セキュリティ、プログラミングの基礎など、現代社会で必須となるITリテラシーを幅広く学びます。',
    icon: 'BookOpen',
    color: 'bg-blue-500 text-white',
    category: '情報',
    answerLink: 'https://zensho.or.jp/examination/pastexams/information/',
    studyContent: {
      overview: '情報基礎は、共通教科「情報Ⅰ」と共通する内容で構成される新科目です。ビジネスで活用するための基礎知識を習得します。',
      sections: [
        {
          title: '企業活動と情報処理',
          items: ['ICTの重要性（AI, IoT, クラウド, ビッグデータ）', 'コミュニケーションとデザイン（UI/UX, アクセシビリティ）', '情報モラルと法規（著作権, 個人情報保護, 不正アクセス禁止法）']
        },
        {
          title: 'コンピュータシステムとネットワーク',
          items: ['ハードウェアの構成（CPU, メモリ, ストレージ）', 'ソフトウェア（OS, OSS, アプリケーション）', 'ネットワークの仕組み（LAN, Wi-Fi, IPアドレス, ドメイン名）', '情報セキュリティ（マルウェア, サイバー攻撃, 認証技術）']
        },
        {
          title: '情報の集計と分析',
          items: ['統計分析の基礎（標本調査, 誤差, 尺度水準）', 'データの可視化（各種グラフ, Zグラフ, ABC分析）', '問題解決の手法（PDCA, MECE, シミュレーション, 流れ図）']
        }
      ]
    },
    resourceSections: [
      {
        title: '学習リソース',
        links: [
          { title: 'Quizlet提出状況（スプレッドシート）', url: 'https://docs.google.com/spreadsheets/d/1_T9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9/edit?usp=sharing', type: 'spreadsheet' }
        ]
      }
    ]
  },
  {
    id: 'info-processing',
    title: '情報処理',
    subtitle: '全商/3級程度',
    badge: '1年生向け',
    level: '3級程度',
    description: '従来の3級と同様、3級程度の実技と筆記を合わせた検定です。対象は1年生で、実技試験の学習を先に行います。表計算ソフトの活用能力と、コンピュータの仕組みに関する基礎知識をバランスよく測定するのが特徴です。',
    icon: 'Cpu',
    color: 'bg-blue-500 text-white',
    category: '情報',
    answerLink: 'https://zensho.or.jp/examination/pastexams/information/',
    externalLinks: [
      { title: '全商：公式解答集（情報処理検定）', url: 'https://zensho.or.jp/examination/pastexams/information/', type: 'link' },
      { title: '過去問題（全商公式サイト）', url: 'https://zensho.or.jp/examination/pastexams/information/', type: 'link' }
    ],
    studyContent: {
      overview: '情報処理は、3級程度の実技と筆記を合わせた検定です。1年生を対象としています。実技試験（100点満点）は70点以上で合格です。20箇所の採点ポイント（各5点）があり、7箇所以上のミスで不合格となります。',
      sections: [
        {
          title: '【実技】高得点をとるポイント',
          items: [
            'コンマ（指定箇所のみ・毎回異なる）',
            '罫線（指定箇所のみ・毎回異なる）',
            '黒い太枠で囲まれているところ（18箇所）',
            '合計20箇所 × 5点 ＝ 100点'
          ]
        },
        {
          title: 'コンピュータシステム',
          items: ['文字コード（Unicode, JIS）', 'ファイル形式（バイナリ, テキスト）', 'システムの信頼性（デュアルシステム, デュプレックスシステム）']
        },
        {
          title: 'ネットワークとデータベース',
          items: ['プロトコル（TCP/IP）', 'リレーショナルデータベース（SQL, 正規化）', '情報セキュリティ管理']
        }
      ]
    },
    resourceSections: [
      {
        title: '【１〜３】用語対策として',
        links: [
          { title: '1日1回Quizletに取り組む（毎日回答）', url: 'https://forms.gle/LkPiteDVjQ86FAq3A', type: 'form' },
          { title: 'Quizlet提出状況（スプレッドシート）', url: 'https://docs.google.com/spreadsheets/d/1_T9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9/edit?usp=sharing', type: 'spreadsheet' },
          { title: '３級Quizlet', url: 'https://quizlet.com/join/E5Fq6wDS8?i=3hcnum&x=1bqt', type: 'quizlet' },
          { title: '用語タイピング（前半）', url: 'https://typing.twi1.me/game/291505', type: 'typing' },
          { title: '用語タイピング（後半）', url: 'https://typing.twi1.me/game/291536', type: 'typing' }
        ]
      },
      {
        title: '【解答集】公式・参考',
        links: [
          { title: '全商：公式解答集（情報処理検定）', url: 'https://zensho.or.jp/examination/pastexams/information/', type: 'link' },
          { title: '過去問題（全商公式サイト）', url: 'https://zensho.or.jp/examination/pastexams/information/', type: 'link' }
        ]
      },
      {
        title: '【実技】対策・解説動画',
        links: [
          { title: '実技で高得点をとる仕組み（ドキュメント）', url: 'https://docs.google.com/document/d/10ezDckx3fGm0eXD6OtE-9Upm8wTv43MyjJt9HLZt_GQ/edit?usp=drive_link', type: 'drive' },
          { title: '実技の得点のカウント方法（動画）', url: 'https://www.youtube.com/watch?v=twRe-Nw_YFw', type: 'video' },
          { title: '全商情報処理検定３級 模擬実技問題（解説動画集）', url: 'https://www.youtube.com/playlist?list=PLz_Qz70gOXI8XuIeMYl94qWmkaOpnw_57', type: 'video' },
          { title: '実技問題の解説動画（Youtubeプレイリスト）', url: 'https://www.youtube.com/playlist?list=PLz_Qz70gOXI9Bysfh9Mt3irWCiJ_95mU5', type: 'video' }
        ]
      },
      {
        title: '実技試験 練習スプレッドシート（解答・解説付き）',
        links: [
          { title: '第１回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/11f3s1N9n-h0aHbtVdL9s_Vptpfo1YGgZjhXb9rq-4PU/copy', type: 'spreadsheet' },
          { title: '第１回解説動画', url: 'https://www.youtube.com/watch?v=B1cY0JeVgpI', type: 'video' },
          { title: '第２回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1rM4IgvrDapZL4DlLtALI5FEK__JetniPk6UjWzGJHDU/copy', type: 'spreadsheet' },
          { title: '第２回解説動画', url: 'https://www.youtube.com/watch?si=G7lrQVcqy77M-LnB&v=1FeOg32Ai4s&feature=youtu.be', type: 'video' },
          { title: '第３回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1n0LbebeOf4F_9znnHm2JTTTh1TNIOQtU2x1pMLnRDug/copy', type: 'spreadsheet' },
          { title: '第３回解説動画', url: 'https://www.youtube.com/watch?si=XCI2lGD1jgw-VUVn&v=vcA2fq610S4&feature=youtu.be', type: 'video' },
          { title: '第４回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1SN78ZFZUvuHxS69HQxMP6KgViajJ9fAsjpkjup0pvpI/copy', type: 'spreadsheet' },
          { title: '第４回解説動画', url: 'https://www.youtube.com/watch?si=pCMVqIUZ-cC8IkdK&v=b9zITA4N_tM&feature=youtu.be', type: 'video' },
          { title: '第５回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1uGfChWVhIzFWiu_QJsfCD73nTFc1yC2-UtnK4NYKgfc/copy', type: 'spreadsheet' },
          { title: '第５回解説動画', url: 'https://www.youtube.com/watch?si=SaG9Ox-jHMG1J6Lb&v=Lyt6hoVDsTE&feature=youtu.be', type: 'video' },
          { title: '第６回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1pAEhlq2KpKsDJkKlLKGbpKytsdeK9IRUt5ICfdf8SP4/copy', type: 'spreadsheet' },
          { title: '第６回解説動画', url: 'https://www.youtube.com/watch?si=3r8RgqRdTiTm5Rbg&v=dpsbS87oGOE&feature=youtu.be', type: 'video' },
          { title: '第７回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1NVinAnUsqsNDpCpAA9pmdqCFfUivHkslw9JpVjY34yk/copy', type: 'spreadsheet' },
          { title: '第７回解説動画', url: 'https://www.youtube.com/watch?si=HYTESLLyHK1pFnYS&v=OZQCNQudrSE&feature=youtu.be', type: 'video' },
          { title: '第８回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1c1Y6HbG9WYAkxHU3VoeB7mnY9hwaDEAtv-bqf4n0Xac/copy', type: 'spreadsheet' },
          { title: '第８回解説動画', url: 'https://www.youtube.com/watch?si=KD2jChQIWzvsq_vY&v=k2Msbx6IQn8&feature=youtu.be', type: 'video' },
          { title: '第９回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1M11QyOcJVS5OKC1IHGqkjTigxoiQfrCRJ5oboeRLkbU/copy', type: 'spreadsheet' },
          { title: '第９回解説動画', url: 'https://www.youtube.com/watch?si=_WDvM5C4UHhKeiw3&v=hSSDOisFIsI&feature=youtu.be', type: 'video' },
          { title: '第10回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1_iRXDaA5MFUPgJKvnNQAAT3cdkNv_BEhmcE7TW6Hz7Q/copy', type: 'spreadsheet' },
          { title: '第10回解説動画', url: 'https://www.youtube.com/watch?si=O4Vv1ad9i4Y6dftq&v=X4pIUgycp_g&feature=youtu.be', type: 'video' },
          { title: '第11回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/17Fku5Ml-nskg673fTMQAnVk5mF35ynaDErKdMxcBulA/copy', type: 'spreadsheet' },
          { title: '第11回解説動画', url: 'https://www.youtube.com/watch?si=UJLneUJKjrZKyeX5&v=pibr0H1QJaQ&feature=youtu.be', type: 'video' },
          { title: '第12回模擬実技（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/149EnrN4LtLL-g1f_-djLk0sD-RpAiYv4laOceS-_6bA/copy', type: 'spreadsheet' },
          { title: '第12回解説動画', url: 'https://www.youtube.com/watch?si=D-DnvHnLx7ManTEl&v=PWFpDSShzBI&feature=youtu.be', type: 'video' },
          { title: '第65回過去問（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/1N2uc3mpZm2vLVml66Cff6uYhYBc1e50wHcuNYlZuIXU/copy', type: 'spreadsheet' },
          { title: '第65回解説（Canva）', url: 'https://www.canva.com/design/DAFusrlRvhc/VVeaXILxURchx9Xp5EMgmw/watch?utm_content=DAFusrlRvhc&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink', type: 'link' },
          { title: '第66回過去問（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/14qStEvfJ6YqGrG2ffm5vba9cBBu_u_Sdcahr3UhrDSo/copy', type: 'spreadsheet' },
          { title: '第66回解説（Canva）', url: 'https://www.canva.com/design/DAFuszPSGsE/WSc9-9tfMXlatHZGlJu1Uw/watch?utm_content=DAFuszPSGsE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink', type: 'link' },
          { title: '第67回過去問（練習Sheet）', url: 'https://docs.google.com/spreadsheets/d/12pImgTg-M1pllH8pLhVwK5_9ccxBRT5pHT6z8KtuQMU/copy', type: 'spreadsheet' },
          { title: '第67回解説（Canva）', url: 'https://www.canva.com/design/DAFus6KMDQ4/Wp1LdzG0eI1NkGPVL35n7w/watch?utm_content=DAFus6KMDQ4&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink', type: 'link' }
        ]
      }
    ]
  },
  {
    id: 'biz-info-1',
    title: '情報処理検定（ビジネス情報部門）１級',
    subtitle: '全商/PBT方式',
    badge: '2年向け／3年リベンジ',
    level: '1級',
    description: 'DB・SQL・ネットワーク・セキュリティ・高度な表計算を問う最上位資格。就活・推薦に強い！',
    icon: 'Briefcase',
    color: 'bg-orange-500 text-white',
    category: '情報',
    answerLink: 'https://zensho.or.jp/examination/pastexams/information/',
    externalLinks: [
      { title: '情報処理検定１級 練習問題（NotebookLM）', url: 'https://notebooklm.google.com/notebook/47f9ec0e-a92c-42be-9ba6-78fa6774b02a', type: 'link' },
      { title: '解答集（スプレッドシート）', url: 'https://docs.google.com/spreadsheets/d/15ZZQmfSbzQnodWkp-FW-JMBEt5_AmB1PuAQ-oqcRLUI/edit?gid=953802812#gid=953802812', type: 'spreadsheet' },
      { title: '全商：過去問題（情報処理検定）', url: 'https://zensho.or.jp/examination/pastexams/information/', type: 'link' },
      { title: '過去問分析予想シート', url: 'https://docs.google.com/spreadsheets/d/1cL4Mu-0IQx4HhhavFDO5tAZyS7fRxXHvKDAV0cqL7Ic/edit?usp=sharing', type: 'spreadsheet' }
    ],
    studyContent: {
      overview: 'ビジネス情報1級は、企業の経営管理や情報の戦略的活用について、高度な知識と技能を習得することを目的としています。',
      sections: [
        {
          title: '経営管理と情報システム',
          items: ['経営戦略と情報化', '業務プロセスの改善', '情報システムの企画・開発']
        },
        {
          title: 'データの活用と分析',
          items: ['データベースの設計', 'データマイニング', '意思決定支援']
        }
      ]
    },
    examStructure: {
      title: 'ビジネス情報処理１級の検定って、どんな感じ？？',
      rows: [
        { id: '【1】', content: '用語', count: '5問', points: '2点', subtotal: '10点' },
        { id: '【2】', content: '用語', count: '5問', points: '2点', subtotal: '10点' },
        { id: '【3】', content: '用語＋計算問題 工数／稼働率／通信速度／記憶容量', count: '用語3問＋計算2問', points: '2点', subtotal: '10点' },
        { id: '【4】', content: '関連知識', count: '5問', points: '3点', subtotal: '15点' },
        { id: '【5】', content: 'データベース', count: '5問', points: '3点', subtotal: '15点' },
        { id: '【6】', content: '表計算', count: '5問', points: '4点', subtotal: '20点' },
        { id: '【7】', content: '表計算の計算問題', count: '5問', points: '4点', subtotal: '20点' },
      ],
      totalCount: '35問',
      totalPoints: '100点'
    },
    resourceSections: [
      {
        title: '【解答集】公式・参考',
        links: [
          { title: '全商：公式解答集（情報処理検定）', url: 'https://zensho.or.jp/examination/pastexams/information/', type: 'link' },
          { title: '過去問題（全商公式サイト）', url: 'https://zensho.or.jp/examination/pastexams/information/', type: 'link' },
          { title: '解答集（スプレッドシート）', url: 'https://docs.google.com/spreadsheets/d/15ZZQmfSbzQnodWkp-FW-JMBEt5_AmB1PuAQ-oqcRLUI/edit?gid=953802812#gid=953802812', type: 'spreadsheet' }
        ]
      },
      {
        title: '【１〜３】用語対策として',
        links: [
          { title: '1日1回Quizletに取り組む（フォームで回答）', url: 'https://forms.gle/8fi8rvoiNFPqjbPe7', type: 'form' },
          { title: 'Quizlet提出状況（スプレッドシート）', url: 'https://docs.google.com/spreadsheets/d/1_T9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9v9/edit?usp=sharing', type: 'spreadsheet' },
          { title: '１級Quizlet', url: 'https://quizlet.com/user/Maruai/folders/105993908?i=3hcnum&x=1xqt', type: 'quizlet' },
          { title: '用語・計算問題の手書き解説集', url: 'https://drive.google.com/file/d/1HuDkmfwxPrGiqjmzA28oqVDUdlN7R7vl/view?usp=drive_link', type: 'drive' },
          { title: '用語をタイピングで覚えよう（前半）', url: 'https://typing.twi1.me/game/291043', type: 'typing' },
          { title: '用語をタイピングで覚えよう（後半）', url: 'https://typing.twi1.me/game/291047', type: 'typing' },
          { title: '計算問題の回答用紙', url: 'https://drive.google.com/file/d/1_yo7_9vbeX0Ow4i_V3bFQFjoY6iom3Y9/view', type: 'drive' },
          { title: '計算問題の手書き解説集', url: 'https://drive.google.com/file/d/1CYF8PDxj7B6CU_tBEEPYLfWCuy_M8Ckb/view', type: 'drive' },
          { title: '工数計算説明（スライド）', url: 'https://docs.google.com/presentation/d/1VHrDhWb4HKgFnoafV1SNNvW3yzSs8hyO9xD89KQrlFE/present?slide=id.p', type: 'presentation' },
          { title: '工数計算手書き説明', url: 'https://drive.google.com/file/d/1B-3rgsxvqTkGAHk99GYrlBHcf_LsLUHY/view?usp=drive_link', type: 'drive' }
        ]
      },
      {
        title: '【４】関連知識対策として',
        links: [
          { title: '関連知識の手書き解説集', url: 'https://drive.google.com/file/d/1uF-CR6GYlbgJSN-hBAQeRe_LVAC3IND4/view?usp=drive_link', type: 'drive' },
          { title: '関連知識の回答用紙', url: 'https://drive.google.com/file/d/14gWYcwk69pHbo7_evf08foyj8a2tMb3Y/view?usp=drive_link', type: 'drive' }
        ]
      },
      {
        title: '【５】DB対策として',
        links: [
          { title: 'DBの手書き解説集', url: 'https://drive.google.com/file/d/1lNl_e-kMS6onBwPmXe3UbizRkpIM6g4m/view?usp=drive_link', type: 'drive' },
          { title: 'DBの回答用紙', url: 'https://drive.google.com/file/d/1ZwKtuiYEGkgB5lgx186qPnAWGLn3CH6G/view?usp=drive_link', type: 'drive' }
        ]
      },
      {
        title: '【６】表計算対策として',
        links: [
          { title: '表計算の手書き解説集', url: 'https://drive.google.com/file/d/1QgCN5mZXIBbrNYHfSi3K76ROvhyFVGAk/view?usp=drive_link', type: 'drive' },
          { title: '表計算の回答用紙', url: 'https://drive.google.com/file/d/1T4l00GhbcjoO2nUAjRSvj_O5M7FZyvx7/view?usp=drive_link', type: 'drive' }
        ]
      },
      {
        title: '【７】表計算の読み取り問題対策として',
        links: [
          { title: '問題集の練習問題１', url: 'https://drive.google.com/file/d/1MfcmTmrUQBoolTA7NWnFvUvCO0bSMI1b/view?usp=drive_link', type: 'drive' },
          { title: '問題集の練習問題２', url: 'https://drive.google.com/file/d/16SwmIFkc_usURTNJ-zl1HikIMQWwQdcT/view?usp=drive_link', type: 'drive' },
          { title: '問題集の練習問題３', url: 'https://drive.google.com/file/d/1D2wwavWfw2Uz_Sfka4qpMC3WPdAk7vgG/view?usp=drive_link', type: 'drive' },
          { title: '問題集の練習問題４', url: 'https://drive.google.com/file/d/1WQ0oFn7Fyko-KGF86g2F6MpQ_OmcaAjD/view?usp=drive_link', type: 'drive' },
          { title: '問題集の練習問題５', url: 'https://drive.google.com/file/d/1mPM747yy5Lji-ZplBaqGtnxeN_Ga0P4-/view?usp=drive_link', type: 'drive' },
          { title: '第７０回【７】手書き解説書', url: 'https://drive.google.com/file/d/1Dn73OqzlG8hjcai77b3enbuznu0yJEG7/view?usp=drive_link', type: 'drive' },
          { title: '第６９回【７】手書き解説書', url: 'https://drive.google.com/file/d/18LxUSda-ZYTqX5rIEhAijn87dno-O0z2/view?usp=drive_link', type: 'drive' },
          { title: '第６７回【７】手書き解説書', url: 'https://drive.google.com/file/d/1nLQBkGT6HQT7Rp_CyInUFRsnyWSFAbva/view?usp=drive_link', type: 'drive' },
          { title: '第６６回【７】手書き解説書', url: 'https://drive.google.com/file/d/1weu1udz2-TlzBc9N1tm-9DvLo2gSTaqb/view?usp=drive_link', type: 'drive' },
          { title: '第６４回【７】手書き解説書', url: 'https://drive.google.com/file/d/1yPENLrIl81nfCkxPbwQiIoHCetwRwo1D/view?usp=drive_link', type: 'drive' },
          { title: '第６１回【７】手書き解説書', url: 'https://drive.google.com/file/d/16BqzRH21VkzsUXIb97Ea9TkR13tACzmG/view?usp=drive_link', type: 'drive' }
        ]
      }
    ]
  },
  {
    id: 'it-passport',
    title: 'ITパスポート',
    subtitle: '国家試験/CBT方式',
    badge: '高度な資格に挑戦',
    level: '国家資格',
    headline: 'R7年度３年生１名合格！新３年生も続々挑戦中！',
    description: 'ITに関する共通的な基礎知識を幅広く習得します。女子商生徒向けのオリジナル学習サイトも活用しましょう。',
    icon: 'ShieldCheck',
    color: 'bg-yellow-500 text-white',
    category: '国家試験',
    answerLink: 'https://www.itpas.jitec.ipa.go.jp/',
    externalLinks: [
      { title: 'ITパスポート女子商学習サイト', url: 'https://sites.google.com/yashima.jp/itpassportsikenjosho/ITpass' },
      { title: 'ITパスポート試験ドットコム', url: 'https://www.itpassportsiken.com/' }
    ],
    studyContent: {
      overview: 'ITパスポート試験は、ITを利活用するすべての社会人・学生が備えておくべき、ITに関する共通的な基礎知識を習得していることを証明する国家試験です。',
      sections: [
        {
          title: 'ストラテジ系（経営全般）',
          items: ['企業活動と法務', '経営戦略', 'システム戦略']
        },
        {
          title: 'マネジメント系（IT管理）',
          items: ['開発技術', 'プロジェクトマネジメント', 'サービスマネジメント']
        },
        {
          title: 'テクノロジ系（IT技術）',
          items: ['基礎理論', 'コンピュータシステム', '技術要素（ネットワーク, セキュリティ）']
        }
      ]
    }
  },
  {
    id: 'dx-class',
    title: 'DX授業',
    subtitle: '3学年全クラス実施',
    badge: '探究学習',
    level: '実践',
    description: 'デジタルトランスフォーメーションの基礎と実践を学び、社会の困りごとを支援するギフト（アプリ）を作成！3学年全クラスで実施される授業です。',
    icon: 'Rocket',
    color: 'bg-rose-500 text-white',
    category: '実践・探究',
    answerLink: '#',
    studyContent: {
      overview: 'DX（デジタルトランスフォーメーション）授業は、3学年全クラスの専門科目です。社会の困りごとを解決するアプリを「ギフト」として制作。高校3年生の集大成として、1人1つオリジナルのアプリを作成します。',
      sections: [
        {
          title: 'DXの基本概念',
          items: ['デジタイゼーション and デジタライゼーション', 'DXの成功事例', 'デザイン思考']
        },
        {
          title: '最新テクノロジー',
          items: ['AIと自動化', 'IoTとデータ収集', 'ブロックチェーンの可能性']
        },
        {
          title: '3年生の集大成：アプリ制作',
          items: ['社会の困りごとを解決する「ギフト」の企画', 'ノーコード/ローコードツールでの開発', '1人1つのオリジナルアプリ完成']
        }
      ]
    }
  },
  {
    id: 'paiza',
    title: 'Paizaで掴む未来',
    subtitle: 'スキルチェック',
    badge: '高校生のうちに案件獲得・稼ぐ力を身につける',
    level: 'Cランク',
    description: 'プログラミングスキルを磨き、目標のCランクを獲得しましょう。在学中にお仕事を受注できる可能性も！',
    icon: 'Target',
    color: 'bg-cyan-500 text-white',
    category: '実践・探究',
    answerLink: 'https://paiza.jp/',
    studyContent: {
      overview: 'Paizaは、プログラミングスキルをランクで可視化できるプラットフォームです。Cランクを獲得して在学中にお仕事を受注しましょう！',
      sections: [
        {
          title: '最優先で学んでほしいもの',
          items: [
            { title: 'Python体験版（テキスト）', url: 'https://paiza.jp/works/python/trial/python-trial-1' },
            { title: 'Python体験版（ドリル）言語＝Pythonを選択してね', url: 'https://paiza.jp/works/mondai' }
          ]
        },
        {
          title: '知識編：おすすめ講座',
          items: [
            { title: '生成AI入門リテラシー編', url: 'https://paiza.jp/works/generative-ai-literacy/trial' },
            { title: '生成AI組み込みアプリの企画開発基礎編', url: 'https://paiza.jp/works/planning-and-development-of-generative-ai-embedded-applications/trial' },
            { title: 'Python×AI・機械学習入門編', url: 'https://paiza.jp/works/ai_ml/primer' },
            { title: '情報処理入門テクノロジー編（ITパスポート学習）', url: 'https://paiza.jp/works/technology/primer' },
            { title: '情報処理入門ストラテジ編（ITパスポート学習）', url: 'https://paiza.jp/works/strategy/primer' },
            { title: '情報処理入門マネジメント編（ITパスポート学習）', url: 'https://paiza.jp/works/management/primer' }
          ]
        },
        {
          title: '技術編：おすすめ講座',
          items: [
            { title: 'アルゴリズム入門編', url: 'https://paiza.jp/works/algorithm/primer' },
            { title: 'Webアプリ開発入門 PHP+MySQL編', url: 'https://paiza.jp/works/webapplicationlamp/primer' },
            { title: 'Cランク獲得ストーリー（Python）', url: 'https://paiza.jp/works/python/trial/python-trial-1' }
          ]
        }
      ]
    },
    resourceSections: [
      {
        title: '最優先で学んでほしいもの',
        links: [
          { title: 'Python体験版（テキスト）', url: 'https://paiza.jp/works/python/trial/python-trial-1', type: 'link' },
          { title: 'Python体験版（ドリル）言語＝Pythonを選択してね', url: 'https://paiza.jp/works/mondai', type: 'link' }
        ]
      },
      {
        title: '知識編：おすすめ講座',
        links: [
          { title: '生成AI入門リテラシー編', url: 'https://paiza.jp/works/generative-ai-literacy/trial', type: 'link' },
          { title: '生成AI組み込みアプリの企画開発基礎編', url: 'https://paiza.jp/works/planning-and-development-of-generative-ai-embedded-applications/trial', type: 'link' },
          { title: 'Python×AI・機械学習入門編', url: 'https://paiza.jp/works/ai_ml/primer', type: 'link' },
          { title: '情報処理入門テクノロジー編（ITパスポート学習）', url: 'https://paiza.jp/works/technology/primer', type: 'link' },
          { title: '情報処理入門ストラテジ編（ITパスポート学習）', url: 'https://paiza.jp/works/strategy/primer', type: 'link' },
          { title: '情報処理入門マネジメント編（ITパスポート学習）', url: 'https://paiza.jp/works/management/primer', type: 'link' }
        ]
      },
      {
        title: '技術編：おすすめ講座',
        links: [
          { title: 'アルゴリズム入門編', url: 'https://paiza.jp/works/algorithm/primer', type: 'link' },
          { title: 'Webアプリ開発入門 PHP+MySQL編', url: 'https://paiza.jp/works/webapplicationlamp/primer', type: 'link' },
          { title: 'Cランク獲得ストーリー（Python）', url: 'https://paiza.jp/works/python/trial/python-trial-1', type: 'link' }
        ]
      }
    ]
  },
  {
    id: 'prog-1',
    title: '情報処理検定（プログラミング部門）１級',
    subtitle: '全商/PBT方式',
    badge: '高度な挑戦',
    level: '1級',
    description: '高度なプログラミング技術と論理的思考を養います。',
    icon: 'Code',
    color: 'bg-emerald-500 text-white',
    category: 'プログラミング部門',
    answerLink: 'https://zensho.or.jp/examination/information/',
    studyContent: {
      overview: 'プログラミング1級は、アルゴリズムの理解、データ構造の活用、そして効率的なプログラム作成能力を測ります。',
      sections: [
        {
          title: 'アルゴリズムとデータ構造',
          items: ['探索と整列', 'スタックとキュー', '木構造とグラフ']
        },
        {
          title: 'プログラム設計',
          items: ['構造化プログラミング', 'オブジェクト指向の基礎', 'テストとデバッグ']
        }
      ]
    }
  },
  {
    id: 'network-r9',
    title: 'ネットワーク活用',
    subtitle: 'R10年度開始',
    badge: 'R10年度試験',
    level: '新設',
    isNew: true,
    description: '最新のネットワーク技術と活用方法について学びます。令和10年度から導入される新検定です。',
    icon: 'Network',
    color: 'bg-gray-500 text-white',
    answerLink: 'https://zensho.or.jp/examination/information/',
    studyContent: {
      overview: '令和10年度から導入される新検定です。クラウドサービスやモバイルネットワークの活用など、現代の通信環境に即した知識を学びます。',
      sections: [
        {
          title: 'ネットワークの基礎',
          items: ['通信プロトコル', 'IPアドレスの構成', '無線LANの設定']
        },
        {
          title: 'クラウドとセキュリティ',
          items: ['SaaS/PaaS/IaaSの活用', '情報の暗号化', '不正アクセスの防止']
        }
      ]
    }
  },
  {
    id: 'programming-r9',
    title: 'プログラミング',
    subtitle: 'R9年度新設',
    badge: 'R9年度開始',
    level: '新設',
    isNew: true,
    description: '令和9年度から導入される新検定です。プログラミングの基礎から応用までを段階的に学びます。',
    icon: 'Code',
    color: 'bg-gray-500 text-white',
    answerLink: 'https://zensho.or.jp/examination/information/',
    studyContent: {
      overview: '令和9年度から導入される新検定です。論理的思考力を養い、効率的なプログラム作成能力を身につけます。',
      sections: [
        {
          title: 'プログラミングの基礎',
          items: ['変数の宣言と代入', '制御構造（順次・選択・反復）', '関数の定義と呼び出し']
        },
        {
          title: 'データ構造とアルゴリズム',
          items: ['配列の活用', '基本的な整列アルゴリズム', '探索アルゴリズムの理解']
        }
      ]
    }
  }
];

export const PROBLEMS: Record<string, Problem[]> = {
  'info-basics': [
    {
      id: 'ib-1',
      question: 'コンピュータなどの機器を使った情報処理や情報通信技術の総称を表す略語として適切なものはどれですか？',
      options: ['GPS', 'ICT', 'AI', 'SSD'],
      correctAnswer: 1,
      explanation: 'ICT（Information and Communication Technology）は、情報通信技術の総称です。'
    },
    {
      id: 'ib-2',
      question: 'SNSの持つ課題や問題点として適切なものをすべて選んでいるのはどれですか？\nア：個人情報漏洩の恐れ\nイ：著作権違反の画像存在\nウ：フェイクニュースの存在\nエ：他人への誹謗中傷',
      options: ['アのみ', 'イ、ウ', 'ア、ウ、エ', 'ア、イ、ウ、エ'],
      correctAnswer: 3,
      explanation: 'SNSにはこれらすべての課題が存在します。'
    },
    {
      id: 'ib-3',
      question: 'VR（バーチャルリアリティ）の説明として適切なものはどれですか？',
      options: [
        '現実世界にデジタルコンテンツを重ね合わせて表示する技術',
        '現実の風景に情報を付け加え、世界を拡張して見せる技術',
        '専用ゴーグルを装着し、バーチャルな空間に入り込んだような体感を得られる技術',
        '人間の能力を模倣して、データの分析や学習を行う技術'
      ],
      correctAnswer: 2,
      explanation: 'VRは仮想現実であり、専用ゴーグルなどで仮想空間を体感する技術です。'
    },
    {
      id: 'ib-4',
      question: '機械学習に関する記述として適切なものはどれですか？',
      options: [
        '機械が複雑な作業を自動で行えるよう、人間の動作を記憶させること',
        'PCやインターネットを利用して、電子教材で学習すること',
        'データを与えてデータ間の関係性を見つけたり、答えを導き出す方法を自動的に学習させること',
        '専門家の判断過程を分析し、コンピュータが同じように判断できるようプログラミングすること'
      ],
      correctAnswer: 2,
      explanation: '機械学習は、データからパターンやルールを自ら学習する技術です。'
    },
    {
      id: 'ib-5',
      question: '伝えたいメッセージの本質を見極め、情報を抽象化して表現したものの総称を何と呼びますか？',
      options: ['非常口', 'マスメディア', 'SNS', 'ピクトグラム'],
      correctAnswer: 3,
      explanation: 'ピクトグラムは、情報を視覚的に抽象化して伝える記号です。'
    },
    {
      id: 'ib-9',
      question: '他人のIDやパスワードを使って、アクセス制限機能を持ったコンピュータに許可なく接続する行為は何という法律に違反しますか？',
      options: ['個人情報保護法', '著作権法', '不正アクセス禁止法', '特許法'],
      correctAnswer: 2,
      explanation: '他人のID等で不正にログインする行為は「不正アクセス禁止法」で禁じられています。'
    },
    {
      id: 'ib-13',
      question: '著作権の説明として適切なものはどれですか？',
      options: [
        '原則として著作物を創作した時点で権利が発生する（無方式主義）',
        '原則として著作物を創作した時点で権利が発生する（方式主義）',
        '原則として著作物を発表した時点で権利が発生する',
        '原則として特許庁に申請した時点で権利が発生する'
      ],
      correctAnswer: 0,
      explanation: '著作権は創作した瞬間に発生し、登録などの手続きは不要（無方式主義）です。'
    }
  ],
  'info-processing': [
    {
      id: 'ip-1',
      question: '実演家やレコード製作者など、著作物の創作者ではないが、その伝達に大きな役割を果たしている者に与えられる権利は何ですか？',
      options: ['産業財産権', '同一性保持権', '著作隣接権', '実用新案権'],
      correctAnswer: 2,
      explanation: '実演家や放送事業者などには「著作隣接権」が認められています。'
    },
    {
      id: 'ip-2',
      question: '世界中の言語で使われている多くの文字を、一つの文字コード体系で表現できる標準規格は何ですか？',
      options: ['ASCIIコード', 'JISコード', 'Unicode', 'シフトJISコード'],
      correctAnswer: 2,
      explanation: 'Unicodeは世界共通の文字コード規格です。'
    }
  ],
  'biz-info-1': [
    {
      id: 'bi1-1',
      question: '企業が持つ経営資源（人・物・金・情報）を統合的に管理し、業務の効率化や経営の意思決定を支援する手法やシステムを何と呼びますか？',
      options: ['SCM', 'CRM', 'ERP', 'BPO'],
      correctAnswer: 2,
      explanation: 'ERP（Enterprise Resource Planning）は、企業全体の資源を統合的に管理する仕組みです。'
    },
    {
      id: 'bi1-2',
      question: 'あるシステム開発プロジェクトにおいて、10人月と見積もられた作業を4ヶ月で完了させるためには、平均して何人の要員が必要ですか？',
      options: ['2.5人', '4人', '10人', '40人'],
      correctAnswer: 0,
      explanation: '10人月 ÷ 4ヶ月 ＝ 2.5人 となります。'
    },
    {
      id: 'bi1-3',
      question: 'データベースのテーブルから特定の条件に一致する行を抽出するために使用するSQLの句はどれですか？',
      options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
      correctAnswer: 2,
      explanation: 'WHERE句は、データの抽出条件を指定するために使用します。'
    },
    {
      id: 'bi1-4',
      question: '稼働率が0.9の装置を2台並列に接続したシステムの全体の稼働率はいくらですか？',
      options: ['0.81', '0.9', '0.99', '1.8'],
      correctAnswer: 2,
      explanation: '並列システムの稼働率 ＝ 1 － (1 － 0.9) × (1 － 0.9) ＝ 0.99 です。'
    },
    {
      id: 'bi1-5',
      question: '指定した範囲の左端の列で特定の値を検索し、その行内の指定した列から値を返すExcel関数はどれですか？',
      options: ['HLOOKUP', 'VLOOKUP', 'LOOKUP', 'MATCH'],
      correctAnswer: 1,
      explanation: 'VLOOKUP（Vertical Lookup）は、垂直方向に検索を行う関数です。'
    },
    {
      id: 'bi1-6',
      question: '公開鍵暗号方式において、送信者が受信者に機密情報を送る際、どの鍵を使って暗号化しますか？',
      options: ['送信者の公開鍵', '送信者の秘密鍵', '受信者の公開鍵', '受信者の秘密鍵'],
      correctAnswer: 2,
      explanation: '受信者の公開鍵で暗号化することで、受信者の秘密鍵を持つ本人のみが復号できます。'
    },
    {
      id: 'bi1-7',
      question: 'データの重複を排除し、整合性を保つためにテーブルを分割するプロセスを何と呼びますか？',
      options: ['最適化', '正規化', '構造化', '階層化'],
      correctAnswer: 1,
      explanation: '正規化は、データベース設計においてデータの冗長性を排除する重要な工程です。'
    }
  ],
  'it-passport': [
    {
      id: 'itp-1',
      question: '企業が自社の業務プロセスを再設計し、情報技術を活用して劇的な改善を図ることを何と呼びますか？',
      options: ['BPR', 'BPO', 'BCP', 'M&A'],
      correctAnswer: 0,
      explanation: 'BPR（Business Process Re-engineering）は、業務プロセスを根本的に見直し、再設計することです。'
    },
    {
      id: 'itp-2',
      question: '不正アクセスを防ぐために、外部ネットワークとの境界に設置して通信を制御する仕組みを何と呼びますか？',
      options: ['プロキシサーバ', 'ファイアウォール', 'ルータ', 'ハブ'],
      correctAnswer: 1,
      explanation: 'ファイアウォールは、あらかじめ設定したルールに基づいて通信を許可または遮断する仕組みです。'
    },
    {
      id: 'itp-3',
      question: 'プロジェクト管理において、作業の依存関係を網羅し、プロジェクトの最短完了期間（クリティカルパス）を特定するために用いられる図はどれですか？',
      options: ['ガントチャート', 'アローダイアグラム（PERT図）', 'マインドマップ', '特性要因図'],
      correctAnswer: 1,
      explanation: 'アローダイアグラムは、作業の順序関係を矢印で表した図で、クリティカルパスの特定に有効です。'
    }
  ],
  'prog-1': [
    {
      id: 'pr1-1',
      question: 'アルゴリズムの説明として適切なものはどれですか？',
      options: [
        '問題を解決するための手順や計算方法',
        'コンピュータを動かすための電気信号',
        'データを保存するための記憶装置',
        'プログラムの実行結果を表示する画面'
      ],
      correctAnswer: 0,
      explanation: 'アルゴリズムは、特定の目的を達成するための処理手順のことです。'
    },
    {
      id: 'pr1-2',
      question: '「もし〜ならば」という条件によって処理を分ける構造を何と呼びますか？',
      options: ['順次構造', '選択構造', '反復構造', '再帰構造'],
      correctAnswer: 1,
      explanation: '条件によって処理を分岐させるのは「選択構造」です。'
    },
    {
      id: 'pr1-3',
      question: '同じ処理を何度も繰り返す構造を何と呼びますか？',
      options: ['順次構造', '選択構造', '反復構造', '並列構造'],
      correctAnswer: 2,
      explanation: '繰り返し処理を行うのは「反復構造」です。'
    }
  ]
};
