import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Button,
  Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/eula/index';

class Eula extends Component {
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left />
          <Body>
            <Title style={styles.headerTitle}>
              利用規約
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <Text style={styles.headerRight}>同意する</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.contentView}>
            <Text>RNHBFavをご利用する場合には下記の契約、およびこの文書の記載事項に同意していただくことが必要になります。</Text>
            <Text>利用者が上部にある「同意する」を選択した場合、これらに同意したものといたします。同意できない場合はRNHBFavを削除してください。</Text>

            <Text style={styles.subtitle}>RNHBFavソフトウェア使用許諾契約</Text>

            <Text>RNHBFav（以下「本ソフトウェア」という）をダウンロード、インストール、使用する際には、下記の使用許諾契約書にご同意いただくことが必要です。本ソフトの使用者（以下「お客様」という）は、本ソフトウェアをダウンロード、インストール、使用された時点で、下記の使用許諾契約書にご同意いただいたものとさせていただきます。</Text>

            <Text>YuheiNakasaka（以下「甲」という）は、お客様に対し、本ソフトウェアにつき、譲渡不能、移転不能の非独占的使用権を下記条項に基づき許諾します。 本契約は、お客様が本ソフトウェアをダウンロードした日付をもって発効するものとします。</Text>

            <Text style={styles.subtitle}>第1条 使用許諾</Text>
            <Text>甲は、お客様に対して、本ソフトウェアをインストール、複製又は使用する非独占で譲渡不可の権利を許諾します。</Text>

            <Text style={styles.subtitle}>第2条 著作権</Text>
            <Text>本ソフトウェアの著作権は、甲が保有しており、国際条約及び著作権法により保護されています。</Text>

            <Text style={styles.subtitle}>第3条 使用上の制限</Text>
            <Text>お客様は、本プログラムに関し、以下の行為を行ってはならないものとします。</Text>

            <Text>1. 本プログラムを、本契約で認められた方法で使用するために必要な限度を超えて、複製し、または二次的著作物を作成すること。</Text>

            <Text>2. 本プログラム又はその一部を改変、デバッグ、リバースエンジニアリング、デコンパイル、ディスアセンブリング、ディクリプトすること。</Text>

            <Text>3. 本プログラムを第三者に貸与し、もしくは使用させること、または、ネットワークにより送信すること。</Text>

            <Text>4. 本契約で認められている場合を除き、本契約に基づきお客様に認められた権利（以下「本件ライセンス」といいます）を第三者に譲渡すること。</Text>

            <Text>5. 本プログラムに表示されている権利表示等を削除すること。</Text>

            <Text style={styles.subtitle}>第4条 免責</Text>
            <Text>本ソフトウェアは、お客様に対して現状のまま提供されるものであり、甲は本ソフトウェアにプログラミング上の誤りその他の瑕疵のないこと、本ソフトウェアが特定目的に適合すること、本ソフトウェアまたはその使用がお客様または第三者の権利を侵害するものではないこと、その他いかなる内容についての保証を行うものではありません。 甲は、本ソフトウェアの補修、保守その他いかなる義務も負わないものとします。また、本ソフトウェアの使用に起因して、お客様または第三者に生じた損害について、原因のいかんを問わず、一切の責任を負わないものとします。</Text>

            <Text style={styles.subtitle}>第5条 使用許諾契約書の変更</Text>
            <Text>甲は、必要があると認めるときは、お客様に対する事前の通知を行うことなく、いつでも本使用許諾契約書を変更することができるものとします。 甲は使用許諾契約書を変更した時には、変更後の使用許諾契約書を甲ウェブサイトへの掲載等の方法により公表するものとします。 前項の公表後に、お客様が本ソフトウェアの使用を継続するときは、お客様は、変更後の使用許諾契約書に同意したものとみなされます。</Text>

            <Text style={styles.subtitle}>第6条. 準拠法及び合意管轄裁判所</Text>
            <Text>本契約は、その有効性、解釈及び履行を含め、全ての事項に関して日本国法に準拠するものとします。</Text>

            <Text style={styles.subtitle}>認証情報の取扱いについて</Text>
            <Text>RNHBFavははてなのOAuth認証機構を利用してアクセストークンとアクセストークンシークレットを取得します。取得したトークンはブックマークの作成・編集・削除、その他APIの認証時のみに利用します。トークンをサーバーに送信したり第三者に提供したりすることは行いません。</Text>
          </View>
        </Content>
      </Container>
    );
  }
}


export default Eula;
