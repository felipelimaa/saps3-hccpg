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

const fieldsForm = {
  idade: 0,
  diasInternacoesPrevios: 0,
  procedencia: 0,
  tratOncologico: 0,
  cancer: 0,
  cancerHematologico: 0,
  insuficienciaCardiaca: 0,
  cirrose: 0,
  sidaHIV: 0,
  drogasVasoativasPrevias: 0,
  admissaoUTI: 0,
  cardiovascular: 0,
  hepatopatia: 0,
  digestivo: 0,
  neurologico: 0,
  cirurgiaNaAdmissao: 0,
  tipoDeOperacao: 0,
  infeccaoNosocomial: 0,
  infeccaoRespiratoria: 0,
  glasgow: 0,
  pressaoArterialSistolica: 0,
  frequenciaCardiaca: 0,
  temperatura: 0,
  oxigenacao: 0,
  bilirrubina: 0,
  creatinina: 0,
  leucocitos: 0,
  ph: 0,
  plaquetas: 0
}

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [formSaps, setFormSaps] = useState(fieldsForm);
  const [form] = Form.useForm();

  const next = () => {
    setCurrent(current + 1);
  }

  const prev = () => {
    setCurrent(current - 1);
  }

  const onFinish = (values : any) => {
    //console.log(values)
  }

  const onFormSaps = (event : any) => {
    const { idade, diasInternacoesPrevios, procedencia } = event
    //console.log(idade)
    setFormSaps({
      ...formSaps, 
      ['idade']: idade == 'undefined' ? 0 : idade, 
      ['diasInternacoesPrevios']: diasInternacoesPrevios, 
      ['procedencia']: procedencia
    })
    console.log(formSaps)
  }

  const onChange = (event : any) => {
    //const {name, value} = event.target
    //setFormSaps({...formSaps, [name]: value})
    //const values = form.getFieldsValue()
    //console.log(values)
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
                onFinish={onFinish}
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
                              onChange={onChange}
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
                      </>
                    )}
                </div>
                <Form.Item>
                  <div className={styles.stepsAction}>
                      {current < steps.length - 2 && (
                        <Button type="primary" onClick={() => {
                          next()
                          onFormSaps(form.getFieldsValue())
                        }}>
                          Avançar
                        </Button>
                      )}
                      {current === steps.length - 2 && (
                        <Button type="primary" htmlType="submit" onClick={() => {
                            message.success('SAPS 3 finalizado!')
                            next()
                            onFormSaps(form.getFieldsValue())
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