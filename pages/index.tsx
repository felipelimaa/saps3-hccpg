import React, { useState } from 'react'

import { 
  Layout, 
  Breadcrumb, 
  Form, 
  Radio,
  Row,
  Col,
  Card,
  Statistic,
  Button,
  Steps,
  message
} from 'antd';

import { ArrowUpOutlined } from '@ant-design/icons';

import styles from './styles/index.module.css';

import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';

import comorbidades from './api/comorbidades.json';
import dadosInternacao from './api/dadosInternacao.json';
import motivoAdmissao from './api/motivoAdmissao.json';
import variaveis from './api/variaveis.json';

const { Content } = Layout;
const { Step } = Steps;

const steps = [
  {
    title: 'Dados da Internação',
    json: dadosInternacao
  },
  {
    title: 'Comorbidades',
    json: comorbidades
  },
  {
    title: 'Motivo da admissão',
    json: motivoAdmissao
  },
  {
    title: 'Variáveis',
    json: variaveis
  },
  {
    title: 'Resultado',
    json: []
  }
]

const layoutForm = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const Home = () => {
  let soma = 0;
    
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [resultValue, setResultValue] = useState(0);
  const [percentValue, setPercentValue] = useState(0.0);

  const next = () => {
    setCurrent(current + 1);
  }

  const prev = () => {
    setCurrent(current - 1);
  }

  const onFormSaps = (event : any) => {
    console.log(event)
    soma = 16
    for (event of Object.values(event)) {
      soma += parseInt(event);
    }
    setResultValue(soma)
    handlePercentScore()
  }

  const handlePercentScore = () => {
    /*
      MortAS=Score;
      MortAS=-64.599+((Math.log(MortAS+71.0599))*13.2322);
      MortAS=Math.exp(MortAS )  / (1 + Math.exp(MortAS))
      MortAS = Fmt(100 * MortAS ) +"%"

    */
    console.log(resultValue)
    let percent = resultValue
    percent =- 64.599+((Math.log(resultValue+71.0599))*13.2322)
    percent = Math.exp(percent) / (1 + Math.exp(percent))
    percent = 100 * percent
    setPercentValue(percent)

  }

  return (
    <>
      <Layout className={styles.layout}> 
        <HeaderComponent />
        

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Escore Fisiológico Agudo Simplificado</Breadcrumb.Item>
          </Breadcrumb>

          
          <Layout 
            className={styles.layoutBackground}
            style={{ padding: '24px 0' }}
          >
            <Content
              className={styles.layoutBackground}
              style={{
                padding: 24,
                margin: 0,
              }}
            >
              <Steps current={current} size="small">
                {steps.map(itemStep => (
                  <Step key={itemStep.title} title={itemStep.title} />
                ))}
              </Steps>
              
              <Form
                form={form}
                name="formSaps3"
                {...layoutForm}
              >
                <div className={styles.stepsContent}>
                  
                    {current < 4 && (
                      <>
                        {steps[current].json.map((item) =>
                          <Form.Item key={item.key} label={`${item.formLabel}:`} name={item.formName}>  
                            <Radio.Group 
                              buttonStyle="solid" 
                              name={item.formName}
                            >
                              {item.respostas.map((resposta) =>
                                <Radio.Button 
                                  key={resposta.key}
                                  value={resposta.value}
                                >
                                  {resposta.label}
                                </Radio.Button>  
                              )}
                            </Radio.Group>
                          </Form.Item>
                        )}
                      </>
                    )}

                    {current == 4 && (
                      <>
                        <Row gutter={16} style={{textAlign: "center"}}>
                          <Col span={24}>
                            <Card>
                              <Statistic
                                title="SAPS 3 Score"
                                value={resultValue}
                                precision={0}
                                valueStyle={{ color: '#3f8600' }}
                              />
                              <Statistic
                                title="Taxa de Mortalidade"
                                value={percentValue}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="%"
                              />
                            </Card>
                          </Col>
                        </Row>
                      </>
                    )}
                </div>
                <Form.Item>
                  <div className={styles.stepsAction}>
                      {current < steps.length - 2 && (
                        <Button type="primary" onClick={() => {
                          next()
                        }}>
                          Avançar
                        </Button>
                      )}
                      {current === steps.length - 2 && (
                        <Button type="primary" htmlType="submit" onClick={() => {
                            message.success('SAPS 3 finalizado!')
                            next()
                            onFormSaps(form.getFieldsValue(true))
                          }}>
                          Finalizar
                        </Button>
                      )}
                      {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                          Voltar
                        </Button>
                      )}
                  </div>
                </Form.Item>
              </Form>
            </Content>
          </Layout>

          
        </Content>

        <FooterComponent />
      </Layout>
    </>
  )
}

export default (Home)