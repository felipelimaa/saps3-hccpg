import React, { useState } from 'react'

import { 
  Layout, 
  Breadcrumb, 
  Collapse, 
  Form, 
  Radio,
  Row,
  Col,
  Card,
  Statistic,
  Descriptions,
  Button,
  Steps,
  message
} from 'antd';
import { CaretRightOutlined, ArrowUpOutlined } from '@ant-design/icons';

import styles from './styles/index.module.css';

import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';

import comorbidades from './api/comorbidades.json';
import dadosInternacao from './api/dadosInternacao.json';
import motivoAdmissao from './api/motivoAdmissao.json';
import variaveis from './api/variaveis.json';

const { Content } = Layout;
const { Panel } = Collapse;
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

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const next = () => {
    setCurrent(current + 1);
  }

  const prev = () => {
    setCurrent(current - 1);
  }

  const formDadosInternacao = {
    idade: 0,
    diasInternacoesPrevios: 0,
    procedencia: 0
  }

  const onFinishInternacao = (values : any) => {
    formDadosInternacao.idade = values.idade
    formDadosInternacao.diasInternacoesPrevios = values.diasInternacoesPrevios
    formDadosInternacao.procedencia = values.procedencia

    console.log(formDadosInternacao)
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
              <Steps current={current}>
                {steps.map(itemStep => (
                  <Step key={itemStep.title} title={itemStep.title} />
                ))}
              </Steps>
              <Form
                form={form}
              >
                <div className={styles.stepsContent}>
                  
                    {steps[current].json.map((item) =>
                      <Form.Item key={item.key} label={`${item.formLabel}:`} name={item.formName}>  
                        <Radio.Group buttonStyle="solid" name={item.formName}>
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
                </div>
              </Form>
              <div className={styles.stepsAction}>
                {current < steps.length - 2 && (
                  <Button type="primary" onClick={() => next()}>
                    Avançar
                  </Button>
                )}
                {current === steps.length - 2 && (
                  <Button type="primary" onClick={() => {
                      message.success('SAPS 3 finalizado!')
                      next()
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
            </Content>
          </Layout>

          <Layout style={{ padding: '24px 0' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </Layout>
        </Content>

        <FooterComponent />
      </Layout>
    </>
  )
}

export default (Home)